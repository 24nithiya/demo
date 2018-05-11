package com.entoss.pomfret.actnow.claims.service;

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
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.camunda.bpm.engine.impl.util.json.JSONObject;

import com.entoss.actnow.domain.ActNowTask;
import com.entoss.pomfret.actnow.client.RestClient;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.ActNowTaskMapper;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("/actnowtask")
public class ActNowTaskService {

	@Inject
	ActNowTaskMapper actNowTaskMapper;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	

	RestClient restClient = RestClient.getRestClientInstance();

	Logger logger = LogManager.getLogger(ActNowTaskService.class);
	
	String subUrl="/actnowtask";
	String jsonResponse;

	@GET
	@Produces("application/json")
	public String getAllActNowTasks(/* @QueryParam("applicationId") String applicationId, */
			@QueryParam("assignee") String assignee, @QueryParam("owner") String owner) {
		logger.info("getAllActNowTasks");
		
		Gson gson = new Gson();

		if (assignee != null && owner != null) {
			
			jsonResponse=gson.toJson(actNowTaskMapper.getAllActNowTasksByAssigneeOwner(assignee, owner));
			//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, jsonResponse,HttpMethod.GET);
			return jsonResponse; 
		} else if (assignee != null) {
			
			jsonResponse=gson.toJson(actNowTaskMapper.getAllActNowTasksByAssignee(assignee));
			//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, jsonResponse,HttpMethod.GET);
			return jsonResponse;
		} else if (owner != null) {
			jsonResponse=gson.toJson(actNowTaskMapper.getAllActNowTasksByOwner(owner));
			//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, jsonResponse,HttpMethod.GET);
			return jsonResponse;
		}
		jsonResponse=gson.toJson(actNowTaskMapper.getAllActNowTasks());
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, jsonResponse,HttpMethod.GET);
		return jsonResponse; 
	}

	@GET
	@Path("/{actNowTaskId}")
	@Produces("application/json")
	public String getActNowTaskById(@PathParam("actNowTaskId") String actNowTaskId) {
		logger.info("getActNowTaskById");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		String jsonResponse = gson.toJson(actNowTaskMapper.getActNowTaskById(actNowTaskId));
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/"+actNowTaskId, jsonResponse,HttpMethod.GET);
		
		return jsonResponse;
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertActNowTask(String jsonRequest) {
		logger.info("insertActNowTask");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		ActNowTask actNowTask = gson.fromJson(jsonRequest, ActNowTask.class);
		actNowTaskMapper.insertActNowTask(actNowTask);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, " ",HttpMethod.POST);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateActNowTask(String jsonRequest) {
		logger.info("updateActNowTask");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		ActNowTask actNowTask = gson.fromJson(jsonRequest, ActNowTask.class);
		actNowTaskMapper.updateActNowTask(actNowTask);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, " ",HttpMethod.PUT);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@POST
	@Path("/claimtask")
	@Produces("application/json")
	@Consumes("application/json")
	public String claimActNowTask(String jsonRequest) {

		logger.info("claimActNowTask");
		
		String taskId = getValueOf(jsonRequest,"taskId");
		String loginId = getValueOf(jsonRequest,"loginId");
		String userPayload="{\"userId\": \""+loginId+"\"}";
		restClient.urlPost("/task/"+taskId+"/claim", userPayload);
		
		String applicationIdJson = restClient.urlGet("/task/"+taskId+"/variables/applicationId");
		String applicationId = getValueOf(applicationIdJson,"value");
		
		String url = "/task/"+taskId;
		String taskJson = restClient.urlGet(url);
		
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
		ActNowTask actNowTask = gson.fromJson(taskJson, ActNowTask.class);
		actNowTask.setApplicationId(UUID.fromString(applicationId));
		actNowTaskMapper.updateActNowTask(actNowTask);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/claimtask", " ",HttpMethod.POST);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	private String getValueOf(String jsonRequest, String str) {
		int fIndex = jsonRequest.indexOf("\"", jsonRequest.indexOf(str) + str.length() + 1);
		int sIndex = jsonRequest.indexOf("\"", fIndex + 1);
		return jsonRequest.substring(fIndex + 1, sIndex);
	}

	@DELETE
	@Path("/{actNowTaskId}")
	@Produces("application/json")
	public String deleteActNowTask(@PathParam("actNowTaskId") String actNowTaskId) {

		logger.info("deleteActNowTask");		
		
		actNowTaskMapper.deleteActNowTask(actNowTaskId);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/"+actNowTaskId, " ",HttpMethod.DELETE);
		
		return "{\"result\":\"SUCCESS\"}";
	}
	
	
	@PUT
	@Path("/update/{id}")
	@Produces("application/json")
	@Consumes("application/json")
	public String updateActNowTaskSetDates(@PathParam("id") String id, String jsonRequest) {
		logger.info("updateActNowTaskSetDates");

		String url = "/task/" + id;
		logger.info(url);

		logger.info(jsonRequest);

		Response resp = restClient.urlPutResp(url, getPayLoad(jsonRequest));

		logger.info("response object:" + resp.getStatus());
		logger.info("response body:" + resp.readEntity(String.class));

		if (resp.getStatus() == 204) {

			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss").create();
			ActNowTask actNowTask = gson.fromJson(jsonRequest, ActNowTask.class);
			actNowTaskMapper.updateActNowTaskSetDates(actNowTask);
			//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/update/"+id, " ",HttpMethod.PUT);
			return "{\"result\":\"updated\"}";
		}

		else {
			return "{\"result\":\"not updated\"}";
		}
	}

	public String getPayLoad(String jsonRequest) {

		String payLoad = "{\r\n" + "  \"name\": \"%s\",\r\n" + "  \"description\": \"%s\",\r\n"
				+ "  \"priority\" : %d,\r\n" + "  \"assignee\" : \"%s\",\r\n" + "  \"owner\" : \"%s\",\r\n"
				+ "  \"due\" : \"%s\",\r\n" + "  \"followUp\" : \"%s\"\r\n" + "}";

		JSONObject requestObject = new JSONObject(jsonRequest);
		String name = requestObject.getString("name");
		String description = requestObject.getString("description");
		int priority = requestObject.getInt("priority");
		String assignee = requestObject.getString("assignee");
		String owner = requestObject.getString("owner");
		String due = requestObject.getString("due");
		String followUp = requestObject.getString("followUp");
		payLoad = String.format(payLoad, name, description, priority, assignee, owner, due, followUp);
		return payLoad;

	}

}