package com.entoss.pomfret.actnow.claims.service;

import java.util.UUID;

import javax.annotation.Resource;
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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.util.json.JSONArray;
import org.camunda.bpm.engine.impl.util.json.JSONObject;

import com.entoss.actnow.domain.ActNowTask;
import com.entoss.actnow.domain.travel.TravelRequest;
import com.entoss.pomfret.actnow.client.RestClient;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.ActNowTaskMapper;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.entoss.pomfret.actnow.daas.ClaimRequestMapper;
import com.entoss.pomfret.actnow.daas.TravelRequestMapper;
import com.entoss.pomfret.actnow.emailNotification.EmailNotification;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

@Path("/travelrequest")
public class TravelRequestService {
	
	Logger logger = LogManager.getLogger(TravelRequestService.class);

	@Inject
	TravelRequestMapper travelRequestMapper;
	
	@Inject ClaimRequestMapper claimRequestMapper;
	@Inject	ActNowTaskMapper actNowTaskMapper;
	
	RestClient restClient = RestClient.getRestClientInstance();
	
	@Inject
	EmailNotification email;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	
	String subUrl="/travelrequest";
	String jsonResponse;
	
	@Resource(mappedName="java:global/camunda-bpm-platform/process-engine/default")
	private ProcessEngine processEngine;

	@GET
	@Produces("application/json")
	public String findAllTravelRequests() {
		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(travelRequestMapper.findAllTravelRequests());
		
		return jsonResponse; 
	}
	
	@GET
	@Path("/travelRequestById")
    @Produces("application/json")
    public String findTravelRequestByEmployeeId(@QueryParam("employeeId") Integer employeeId) {
    	Gson gson = new Gson();
    	
    	jsonResponse=gson.toJson(travelRequestMapper.findTravelRequestByEmployeeId(employeeId));
    	
    	auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/travelRequestById?employeeId="+employeeId," ",jsonResponse);
    	return jsonResponse;
    }

	@GET
	@Path("/{applicationId}")
	@Produces("application/json")
	public String findTravelRequestById(@PathParam("applicationId") UUID applicationId) {
		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(travelRequestMapper.findTravelRequestById(applicationId));
		
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl," ",jsonResponse);
		
		return jsonResponse; 
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String createTravelRequest(String jsonRequest) {
		
		logger.info("createTravelRequest");
		
		String url = "/process-definition/key/actnow_travel_request/start";
    	
    	String startProcessResponse = restClient.urlPost(url, getPayLoad(jsonRequest.trim()));
    	JSONObject startProcessObject = new JSONObject(startProcessResponse);
    	String processInstanceId = startProcessObject.getString("id");
    	String definitionId = startProcessObject.getString("definitionId");
		
		TravelRequest travelRequestDomain = toTravelRequestDomain(jsonRequest);
		travelRequestDomain.setProcessInstanceId(UUID.fromString(processInstanceId));
		travelRequestDomain.setDefinitionId(definitionId);
    	createActNowTask(travelRequestDomain.getApplicationId());
		travelRequestMapper.createTravelRequest(travelRequestDomain);
		
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.POST,AuditConstants.url+subUrl,jsonRequest," ");
		
		return "{\"result\":\"SUCCESS\", \"id\":\""+travelRequestDomain.getId()+"\"}"; 
	}
	
	private String getPayLoad(String jsonRequest) {
		String payLoad = "{\"variables\":\r\n" + 
				"   {\r\n" + 
				"       \"applicationStatus\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"       \"ticketBookingStatus\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"       \"hotelBookingStatus\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"       \"carRentalBookingStatus\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"       \"applicationId\" : {\"value\" : \"%s\", \"type\": \"String\"},\r\n" + 
				"		\"actNowTask\": {\r\n" + 
				"			\"value\": \"{ \\\"assignee\\\": \\\"%s\\\", \\\"priority\\\": 1 }\",\r\n" + 
				"			\"type\": \"Object\",\r\n" + 
				"			\"valueInfo\": {\r\n" + 
				"				\"objectTypeName\": \"com.entoss.actnow.domain.ActNowTask\",\r\n" + 
				"				\"serializationDataFormat\": \"application/json\"\r\n" + 
				"			}\r\n" + 
				"		}\r\n" + 
				"   },\r\n" + 
				"   \"businessKey\" : \"%s\"\r\n" + 
				"}";
		JSONObject requestObject = new JSONObject(jsonRequest);
		String applicationId = requestObject.getString("applicationUuid");
		String applicationStatus = requestObject.getString("applicationStatus");
		String ticketBookingStatus = getValueOf(jsonRequest,"ticketStatus");
		String hotelBookingStatus = getValueOf(jsonRequest,"hotelStatus");
		String carRentalBookingStatus = getValueOf(jsonRequest,"carRentStatus");
		String assignee = getValueOf(jsonRequest,"assignee");
		String businessKey = applicationId;
		
		payLoad = String.format(payLoad, applicationStatus, ticketBookingStatus, hotelBookingStatus, 
					carRentalBookingStatus, applicationId, assignee, businessKey);
		return payLoad;
	}
	
	private String getValueOf(String jsonRequest, String str) {
		int fIndex = jsonRequest.indexOf("\"",
				jsonRequest.indexOf(str)+str.length() +1
				);
		int sIndex = jsonRequest.indexOf("\"",fIndex+1);
		return jsonRequest.substring(fIndex+1, sIndex);
	}
	
	private void createActNowTask(UUID applicationId) {
		
		String url = "/task";
		
		String allTasksJson = restClient.urlPost(url, getTaskPayLoad(applicationId.toString(),true));
		if(allTasksJson.equals("[]")) {
			allTasksJson = restClient.urlPost(url, getTaskPayLoad(applicationId.toString(),false));
		}
		
		JSONArray jsonArray = new JSONArray(allTasksJson);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		for(int i=0;i<jsonArray.length();i++) {
			ActNowTask actNowTask = gson.fromJson(jsonArray.getString(i), ActNowTask.class);
			actNowTask.setApplicationId(applicationId);
			if(actNowTaskMapper.getActNowTaskById(actNowTask.getId()) == null) {
				actNowTaskMapper.insertActNowTask(actNowTask);
			}
		}
	}
	
	private String getTaskPayLoad(String applicationId, boolean caseOrProcess) {
		String casePayload=	"{\"caseInstanceBusinessKey\" : \"%s\"}";
		String processPayload="{\"processInstanceBusinessKey\" : \"%s\"}";
		if(caseOrProcess) {
			return String.format(casePayload,applicationId);
		} else {
			return String.format(processPayload,applicationId);
		}
	}
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateTravelRequest(String jsonRequest) {
		
		logger.info("updateTravelRequest");
		
TravelRequest travelRequest = toTravelRequestDomain(jsonRequest);
    	
    	int employeId=travelRequest.getEmployeeId();
    	
    	String status=travelRequest.getApplicationStatus();
    	
    	String emailId=travelRequestMapper.getEmployeeEmailId(employeId);

		String applicationId = getValueOf(jsonRequest, "applicationUuid");
		String taskId = getValueOf(jsonRequest, "taskId");
		String url = "/task/" + taskId + "/complete";

		if (restClient.urlPost(url, getPayLoad(jsonRequest)) == null) {
			moveToHistory(taskId,emailId,status);
			createActNowTask(UUID.fromString(applicationId));

			//TravelRequest travelRequest = toTravelRequestDomain(jsonRequest);
			travelRequestMapper.updateTravelRequest(travelRequest);
			
			auditRecordMapper.insertAuditRecordMapper(HttpMethod.PUT,AuditConstants.url+subUrl,jsonRequest," ");
			
			return "{\"result\":\"SUCCESS\"}";

		}
		return "{\"result\":\"Not Updated\"}";
	}
	
	private void moveToHistory(String taskId,String emailId,String status) {
		actNowTaskMapper.createTaskHistory(taskId);
		actNowTaskMapper.deleteActNowTask(taskId);
		
		if (status.equals("APPROVED")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status",
						"Your Travel request task is approved by Manager and is forwarded for Travel Agent Review!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (status.equals("REJECTED")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task is Rejected!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("EMPLOYEEREVIEW")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task is Resubmitted to You!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("NEEDAPPROVAL")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task needs further Approval!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("CONFIRMED")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task is confirmed by the Travel Agent!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("WAITINGLIST")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task is in Waiting List!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		else if (status.equals("COMPLETED")) {
			try {
				email.send(emailId, "supriya.sk@entosstech.com", "Travel request task Status", "Your Travel request task is completed!!");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}
	
	@DELETE
	@Path("/{applicationId}")
	@Produces("application/json")
	public String deleteTravelRequest(@PathParam("applicationId") UUID applicationId) {
		
		travelRequestMapper.deleteTravelRequest(applicationId);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	private TravelRequest toTravelRequestDomain(String jsonTravelRequestDTO) {
    	Gson gson = new Gson();
    	com.entoss.pomfret.actnow.dto.TravelRequest travelRequestDTO = 
    			gson.fromJson(jsonTravelRequestDTO, 
    					com.entoss.pomfret.actnow.dto.TravelRequest.class );
    	
    	TravelRequest travelRequest = new TravelRequest();
    	
    	//Conversion from DTO to Domain object.
    	travelRequest.setId(travelRequestDTO.getApplicationId());
    	travelRequest.setDateCreated(travelRequestDTO.getCreatedAt());
    	travelRequest.setDateModified(travelRequestDTO.getModifiedAt());
    	travelRequest.setApplicationId(travelRequestDTO.getApplicationUuid());
    	JsonElement applicationJson = gson.fromJson(jsonTravelRequestDTO,JsonElement.class);
    	travelRequest.setApplication(applicationJson);
    	travelRequest.setApplicationStatus(travelRequestDTO.getApplicationStatus());
    	travelRequest.setCostCentre(travelRequestDTO.getEmployee().getBuId());
    	travelRequest.setEmployeeId(travelRequestDTO.getEmployee().getEmployeeId());
		return travelRequest;
    }
}