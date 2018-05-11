package com.entoss.pomfret.actnow.claims.service;

import javax.annotation.Resource;

import java.util.UUID;


import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.camunda.bpm.engine.impl.util.json.JSONArray;
import org.camunda.bpm.engine.impl.util.json.JSONObject;

import com.entoss.actnow.domain.ActNowTask;
import com.entoss.actnow.domain.travel.ClaimRequest;
import com.entoss.pomfret.actnow.client.RestClient;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.ActNowTaskMapper;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.entoss.pomfret.actnow.daas.ClaimRequestMapper;
import com.entoss.pomfret.actnow.emailNotification.EmailNotification;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.camunda.bpm.engine.ProcessEngine;

@Path("/expenseclaim")
public class ExpenseClaimService {
	
	@Inject ClaimRequestMapper claimRequestMapper;
	@Inject	ActNowTaskMapper actNowTaskMapper;
	
	RestClient restClient = RestClient.getRestClientInstance();
	
	@Inject
	EmailNotification email;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	
	String subUrl="/expenseclaim";
	String jsonResponse;
	
	
	Logger logger = LogManager.getLogger(ExpenseClaimService.class);
	
	@Resource(mappedName="java:global/camunda-bpm-platform/process-engine/default")
	private ProcessEngine processEngine;
	
    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public String createClaimRequest(String jsonRequest) {
    	
    	logger.info("createClaimRequest");
		
    	String url = "/process-definition/key/actnow_expense_claim/start";
    	
    	String startProcessResponse = restClient.urlPost(url, getPayLoad(jsonRequest.trim(),true));
    	
    	JSONObject startProcessObject = new JSONObject(startProcessResponse);
    	String processInstanceId = startProcessObject.getString("id");
    	String definitionId = startProcessObject.getString("definitionId");
    	
    	ClaimRequest claimRequestDomain = toClaimRequestDomain(jsonRequest);
    	claimRequestDomain.setProcessInstanceId(UUID.fromString(processInstanceId));
    	claimRequestDomain.setDefinitionId(definitionId);
    	createActNowTask(claimRequestDomain.getProcessInstanceId().toString(),
    			claimRequestDomain.getApplicationId());
    	claimRequestMapper.createClaim(claimRequestDomain);
    	
    	auditRecordMapper.insertAuditRecordMapper(HttpMethod.POST,AuditConstants.url+subUrl,jsonRequest," ");
    	
        return "{\"result\":\"SUCCESS\", \"id\":\""+claimRequestDomain.getId()+"\"}";
        
    }
    
	private String getPayLoad(String jsonRequest, boolean isInitialPayLoad) {
		String initialPayLoad = "{\"variables\": { \"applicationStatus\" : {\"value\" : \"%s\", \"type\": \"String\"}, \"applicationId\" : {\"value\" : \"%s\", \"type\": \"String\"}, \"actNowTask\" : { \"value\" : \"{ \\\"assignee\\\": \\\"%s\\\", \\\"priority\\\": 2 }\", \"type\": \"Object\", \"valueInfo\": { \"objectTypeName\": \"com.entoss.actnow.domain.ActNowTask\", \"serializationDataFormat\": \"application/json\"}} } }";
		String subsequentPayLoad = "{\"variables\":\r\n" + 
				"    {\r\n" + 
				"        \"applicationStatus\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"        \"actNowTask\" : { \"value\" : \"{ \\\"assignee\\\": \\\"%s\\\", \\\"priority\\\": 2 }\",  \"type\": \"Object\", \"valueInfo\":  { \"objectTypeName\": \"com.entoss.actnow.domain.ActNowTask\", \"serializationDataFormat\": \"application/json\"}}\r\n" + 
				"    }\r\n" + 
				"    \r\n" + 
				"}";
		JSONObject requestObject = new JSONObject(jsonRequest);
		String applicationId = requestObject.getString("applicationUuid");
		String applicationStatus = requestObject.getString("applicationStatus");
		String assignee = getValueOf(jsonRequest, "assignee");
		
		if(isInitialPayLoad) {
			return String.format(initialPayLoad, applicationStatus, applicationId, assignee);
		} else {
			return String.format(subsequentPayLoad, applicationStatus, assignee);
		}
	}
	
	private String getValueOf(String jsonRequest, String str) {
		int fIndex = jsonRequest.indexOf("\"",
				jsonRequest.indexOf(str)+str.length() +1
				);
		int sIndex = jsonRequest.indexOf("\"",fIndex+1);
		return jsonRequest.substring(fIndex+1, sIndex);
	}
    
	private void createActNowTask(String processInstanceId, UUID applicationId) {
		
		String url = "/task?processInstanceId="+processInstanceId;
		
		logger.info("createActNowTask");
		
		String allTasksJson = restClient.urlGet(url);
		JSONArray jsonArray = new JSONArray(allTasksJson);
		
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		for(int i=0;i<jsonArray.length();i++) {
			
		ActNowTask actNowTask = gson.fromJson(jsonArray.getString(0), ActNowTask.class);
		actNowTask.setApplicationId(applicationId);
		actNowTaskMapper.insertActNowTask(actNowTask);
		}
	}
	
    @GET
    @Produces("application/json")
    public String findAllClaims() {
    	
    	logger.info("findAllClaims");
    	
    	Gson gson = new Gson();
    	
    	jsonResponse=gson.toJson(claimRequestMapper.findAllClaims());
    	
    	//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl,jsonResponse,HttpMethod.GET);
    	return jsonResponse;
    }
    
    @GET
    @Path("/myClaims")
    @Produces("application/json")
    public String findMyClaims(@QueryParam("employeeId") Integer employeeId) {
    	
    	logger.info("findMyClaims");
    	
    	Gson gson = new Gson();
    	
    	jsonResponse=gson.toJson(claimRequestMapper.findClaimsByEmployeeId(employeeId));
    	
    	auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/myClaims?employeeId="+employeeId," ",jsonResponse);
    	
    	return jsonResponse;
    }
    
  
    @GET
    @Path("/{applicationId}")
    @Produces("application/json")
    public String findClaimById(@PathParam("applicationId") UUID applicationId) {
    	
    	logger.info("findClaimById");
    	
    	Gson gson = new Gson();
    	
    	jsonResponse=gson.toJson(claimRequestMapper.findClaimById(applicationId));
    	
    	//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/"+applicationId,jsonResponse,HttpMethod.GET);
    	
    	return jsonResponse;
    }
    
    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    public String updateClaim(String jsonRequest) {
    	
    	logger.info("updateClaim");
    	 
    	JSONObject requestObject = new JSONObject(jsonRequest);
    	String applicationId = requestObject.getString("applicationUuid");
    	
    	logger.info("actNow applicationId details===========:"+applicationId);
    	
    	String taskId = getTaskId(applicationId);
    	ClaimRequest claimRequest = toClaimRequestDomain(jsonRequest);
    	
    	int employeId=claimRequest.getEmployeeId();
    	
    	String status=claimRequest.getApplicationStatus();
    	
    	String emailId=claimRequestMapper.getEmployeeEmailId(employeId);
    	
    	/*
    	JSONArray history = requestObject.getJSONArray("history");
    	Gson gson=new Gson();
    	String historyString = new Gson().toJson(history);
    	ActnowEvent[] actNowEvent = gson.fromJson(historyString, ActnowEvent[].class);
    	String remarks=actNowEvent[actNowEvent.length-1].getRemarks();
  	
*/    	/*Gson gson=new Gson();
    	ActnowEvent actNowEvent = gson.fromJson(claimRequest.getApplication(), ActnowEvent.class);
    	String remarks=actNowEvent.getEventDescritption();
    	
    	logger.info("actNowEvent details===========:"+actNowEvent);
    	
    	logger.info("actNowEvent remarks details===========:"+remarks);
    	*/
    	String url = "/task/"+taskId+"/complete";
    	if(restClient.urlPost(url, getPayLoad(jsonRequest,false)) == null) {
	    	moveToHistory(taskId,emailId,status);
	    	createActNowTask(getProcessInstanceId(applicationId), 
	    			UUID.fromString(applicationId));
	    	
	    	//ClaimRequest claimRequest = toClaimRequestDomain(jsonRequest);
	    	claimRequestMapper.updateClaim(claimRequest);
	    	auditRecordMapper.insertAuditRecordMapper(HttpMethod.PUT,AuditConstants.url+subUrl,jsonRequest," ");	    	
	    	return  "{\"result\":\"SUCCESS\"}";
    	}
    	return  "{\"result\":\"Not Updated\"}";
    }
    
    private void moveToHistory(String taskId, String emailId,String status) {
		actNowTaskMapper.createTaskHistory(taskId);
		actNowTaskMapper.deleteActNowTask(taskId);

		if (status.equals("ACCOUNTSREVIEW")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status",
						"Your Expense Claim is approved by Manager and is forwarded for Accounts Review!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (status.equals("CLAIMREJECTED")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status", "Your Expense Claim task is Rejected!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("EMPLOYEEREVIEW")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status", "Your Expense Claim task is Resubmitted to You!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("DISBURSEMONEY")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status", "Your Expense Claim task is approved by Accounts and is forwarded for Disburse Review!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("CLAIMAPPROVAL")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status", "Your Expense Claim task is Resubmitted to Manager for Claim Approval!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("CLAIMDISBURSE")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Expense Claim Task Status", "Your Expense Claim task is completed!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	  }

	private String getProcessInstanceId(String applicationId) {
		UUID processInstanceId;
		processInstanceId = claimRequestMapper.getProcessInstanceId(UUID.fromString(applicationId));
		return processInstanceId.toString();
	}

    
    private String getTaskId(String applicationId) {
		String taskId;
		taskId = claimRequestMapper.getTaskId(UUID.fromString(applicationId));
		return taskId;
	}
    
    @DELETE
    @Path("/{claimId}")
    @Produces("application/json")
    public String deleteClaim(@PathParam("claimId") Integer claimId) {
    	claimRequestMapper.deleteClaim(claimId);
    	
    	//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/"+claimId," ",HttpMethod.DELETE);
    	
    	return "{\"result\":\"SUCCESS\"}";
    }
    
    private ClaimRequest toClaimRequestDomain(String jsonClaimRequestDTO) {
    	Gson gson = new Gson();
    	com.entoss.pomfret.actnow.dto.ClaimRequest claimRequestDTO = 
    			gson.fromJson(jsonClaimRequestDTO, 
    					com.entoss.pomfret.actnow.dto.ClaimRequest.class );
    	
    	ClaimRequest claimRequest = new ClaimRequest();
    	
    	//Conversion from DTO to Domain object.
    	claimRequest.setDateCreated(claimRequestDTO.getCreatedAt());
    	claimRequest.setDateModified(claimRequestDTO.getModifiedAt());
    	claimRequest.setApplicationId(claimRequestDTO.getApplicationUuid());
    	JsonElement jsonElement = gson.fromJson(jsonClaimRequestDTO,JsonElement.class);
    	claimRequest.setApplication(jsonElement);
    	claimRequest.setApplicationStatus(claimRequestDTO.getApplicationStatus());
    	claimRequest.setCostCentre(claimRequestDTO.getEmployee().getBuId());
    	claimRequest.setEmployeeId(claimRequestDTO.getEmployee().getEmployeeId());
    	claimRequest.setTotalAmount(claimRequestDTO.getClaimTotalAmount());
    	claimRequest.setClaimType(claimRequestDTO.getClaimType());
    	
		return claimRequest;
    }
    
}

