package com.entoss.pomfret.actnow.claims.service;

import java.util.Random;

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

import com.entoss.actnow.domain.Employee;
import com.entoss.pomfret.actnow.client.RestClient;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.entoss.pomfret.actnow.daas.EmployeeMapper;
import com.entoss.pomfret.actnow.emailNotification.CurrentServerName;
import com.entoss.pomfret.actnow.emailNotification.EmailNotification;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("/employees")
public class EmployeeService {

	@Inject
	EmployeeMapper employeeMapper;
	
	@Inject
	EmailNotification email;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	
	String subUrl="/employees";
	String jsonResponse;
	
	
	RestClient restClient = RestClient.getRestClientInstance();
	
    @Inject
	CurrentServerName currentServerName;
	
	Logger logger = LogManager.getLogger(EmployeeService.class);

	private String password=null;

	@GET
	@Produces("application/json")
	public String getAllEmployees() {
		Gson gson = new Gson();
		
		return gson.toJson(employeeMapper.getAllEmployees());
	}

	@GET
	@Path("/{loginId}")
	@Produces("application/json")
	public String getEmployeeByLoginId(@PathParam("loginId") String loginId) {

		Gson gson = new Gson();
		
		return gson.toJson(employeeMapper.getEmployeeByLoginId(loginId));
	}

	@GET
	@Path("/company/{cmpnyId}")
	@Produces("application/json")
	public String getEmployeeBycmpnyId(@PathParam("cmpnyId") int cmpnyId) {

		Gson gson = new Gson();
		
		jsonResponse= gson.toJson(employeeMapper.getEmployeeBycmpnyId(cmpnyId));
		
		return jsonResponse; 
	}

	@GET
	@Path("/bu/{buId}")
	@Produces("application/json")
	public String getEmployeeByBuId(@PathParam("buId") int buId) {

		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(employeeMapper.getEmployeeByBuId(buId));
		
		return jsonResponse; 
	}

	@GET
	@Path("/department/{deptId}")
	@Produces("application/json")
	public String getEmployeeByDeptId(@PathParam("deptId") int deptId) {

		Gson gson = new Gson();
		return gson.toJson(employeeMapper.getEmployeeByDeptId(deptId));
	}

	@GET
	@Path("/{employeeId : [0-9]+}")
	@Produces("application/json")
	public String getEmployeeById(@PathParam("employeeId") int employeeId) {

		Gson gson = new Gson();
		jsonResponse=gson.toJson(employeeMapper.getEmployeeById(employeeId));
		
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/"+employeeId,"",jsonResponse);
		return jsonResponse;
	}
	
	
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertEmployee(String jsonRequest) {


		String userUrl = "/user/create";
		
       String payLoad=getPayLoad(jsonRequest);
       logger.info("payload======:"+payLoad);
        
		if (restClient.urlPost(userUrl, payLoad) == null) {
			Gson gson = new Gson();
			Employee employee = gson.fromJson(jsonRequest, Employee.class);
			
			String emailId=employee.getEmailId();
			String loginId=employee.getLoginId();
		
			employeeMapper.insertEmployee(employee);
			
			
			String serverName=currentServerName.getServerName();
			
			String link="http://"+serverName+":8080/actnow-claims-1.0.0/reset/verify.html?user="+loginId;
			logger.info("sending reset password link:"+link);
			//String link="http://"+serverName+"/pomfret-console/reg/verifyemail.xhtml?user="+userId+"&key="+uuid+"";
			
			try {
				
				StringBuilder mailBody=new StringBuilder();
				mailBody.append("<div>")
				.append("Your registration is successfull. Your username is "+loginId)
				.append("  Please click <a href=\""+link+"\"> here </a>to set your Password <br/><br/><br/>")
				.append("Regards,<br/>")
				.append("Pomfret ActNow Support")
				.append("</div>");

		email.send(emailId, "supriya.sk@entosstech.com", "Registration successfull!!",
				mailBody.toString());
				
				/*email.send(emailId, "supriya.sk@entosstech.com", "Registration successfull!!",
						"Your profile is created! Your username is " +emailId);*/
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return "{\"result\":\"SUCCESS\"}";
		}

		else

			return "{\"result\":\"not added\"}";

	}
	
	
	
	@POST
	@Path("/bulk")
	@Produces("application/json")
	@Consumes("application/json")
	public String insertEmployees(String allEmployeesJson) {

		String url = "/user/create";
		Gson gson = new GsonBuilder().
				setDateFormat("E MMM dd HH:mm:ss Z yyyy").create();
		Employee[] employees = gson.fromJson(allEmployeesJson, Employee[].class);
		
		int success = 0, failure = 0;
		for (Employee employee : employees) {
			
			Response response = restClient.urlPostResp(url, getPayLoad(gson.toJson(employee)));
			if (Response.Status.NO_CONTENT.getStatusCode() == response.getStatus() ) {
					
					employeeMapper.insertEmployee(employee);
					success++;
				}
				else {
					failure++;
				}
		}
		return "{\"result\" : { \"success\" : \""+success+"\" , \"failure\" : \""+failure+"\"}}";
	}

	public String getPayLoad(String jsonRequest) {
		String payLoad = "{\"profile\": \r\n" + "  {\"id\": \"%s\",\r\n" + "  \"firstName\":\"%s\",\r\n"
				+ "  \"lastName\":\"%s\",\r\n" + "  \"email\":\"%s\"},\r\n" + "\"credentials\": \r\n"
				+ "  {\"password\":\"%s\"}\r\n" + "}\r\n" + "";

		JSONObject requestObject = new JSONObject(jsonRequest);
		String id = requestObject.getString("loginId");
		//String id = requestObject.getString("emailId");
		String firstName = requestObject.getString("firstName");
		String lastName = requestObject.getString("lastName");
		String email = requestObject.getString("emailId");
		password = generateRandom();

		payLoad = String.format(payLoad, id, firstName, lastName, email, password);

		return payLoad;
	}

	private String generateRandom() {

		String password = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		Random rand = new Random();
		StringBuilder res = new StringBuilder();
		for (int i = 0; i < 6; i++) {
			int randIndex = rand.nextInt(password.length());
			res.append(password.charAt(randIndex));
		}
		return res.toString();
	}
	
	@PUT
	@Path("/resetPassword/{emailId}")
	@Produces("application/json")
	@Consumes("application/json")
	public String resetPassword(@PathParam("emailId") String emailId, String jsonRequest) {
		logger.info("insertRoleMembers");

		String url = "/user/" + emailId +"/credentials/";
		
		restClient.urlPutResp(url, getPayLoadForResetPassword(jsonRequest));
		
		return "{\"result\":\"password updated\"}"; 
		
	}
	
	public String getPayLoadForResetPassword(String jsonRequest) {
		String payLoad ="{\"password\":\"%s\", \"authenticatedUserPassword\": \"%s\"}";

		JSONObject requestObject = new JSONObject(jsonRequest);
		
		logger.info("authenticatedPassword::::"+password);
		
		
		String password1 = requestObject.getString("password");
		
		String authenticatedUserPassword = password;

		logger.info("authenticatedPassword::::"+authenticatedUserPassword);

		payLoad = String.format(payLoad, password1,authenticatedUserPassword);

		return payLoad;
	}
	
	@POST
	@Path("/forgotPassword")
	@Produces("application/json")
	@Consumes("application/json")
	public String forgotPassword(String emailId) {
		String serverName=currentServerName.getServerName();
		
		JSONObject requestObject = new JSONObject(emailId);
		String mailId = requestObject.getString("emailId");
		
		logger.info("email id from json1:"+mailId);
		
		logger.info("email id from json2:"+mailId.toString().replaceAll("\"", ""));
		
		String link="http://"+serverName+":8080/actnow-claims-1.0.0/reset/verify.html?user="+mailId.toString().replaceAll("\"", "");
		// logger.info("sending reset password link:"+link);
		
		
		try {
			
			StringBuilder mailBody=new StringBuilder();
			mailBody.append("<div>")
			//.append("Your registration is successfull. Your username is "+emailId)
			.append("  Please click <a href=\""+link+"\"> here </a>to Reset your Password <br/><br/><br/>")
			.append("Regards,<br/>")
			.append("Pomfret ActNow Support")
			.append("</div>");

	email.send(mailId, "supriya.sk@entosstech.com", "Forgot Passwsord?",
			mailBody.toString());
	
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "{\"result\":\"SUCCESS\"}";
	}
	

	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateEmployee(String jsonRequest) {
		Gson gson = new Gson();
		Employee employee = gson.fromJson(jsonRequest, Employee.class);
		employeeMapper.updateEmployee(employee);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@DELETE
	@Path("/empid/{employeeId}")
	@Produces("application/json")
	public String deleteEmployee(@PathParam("employeeId") int employeeId) {
		employeeMapper.deleteEmployee(employeeId);
		
		
		return "{\"result\":\"SUCCESS\"}";
	}
	
	@DELETE
	@Path("/{loginId}")
	@Produces("application/json")
	public String deleteEmployeeByLoginId(@PathParam("loginId") String loginId) {
		
		String url="/user/"+loginId;
		
		if(restClient.urlDelete(url)==null)
		{
		employeeMapper.deleteEmployeeByLoginId(loginId);
		
		return "{\"result\":\"deleted\"}";
		}
		else
			return "{\"result\":\"not deleted\"}";
	}
	

	@GET
	@Path("/manager")
	@Produces("application/json")
	public String getEmployeeManager(@QueryParam("employeeId") int employeeId, @QueryParam("loginId") String loginId) {
		String managerId = null;
		if (employeeId > 0) {
			managerId = employeeMapper.getManagerByEmployeeId(employeeId);
			auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/manager?employeeId="+employeeId," ",managerId);

		} else if (loginId != null) {
			managerId = employeeMapper.getManagerByLoginId(loginId);
			auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/manager?loginId="+loginId," ",managerId);
		}
		if (managerId != null) {
			return "{ \"managerId\" : " + managerId + " }";
		} else {
			return null;
		}
	}

	@GET
	@Path("/managerdetails/{employeeId : [0-9]+}")
	@Produces("application/json")
	public String getManagerDetailsByEmployeeId(@PathParam("employeeId") int employeeId) {

		Gson gson = new Gson();
		return gson.toJson(employeeMapper.getManagerDetailsByEmployeeId(employeeId)); 
	}
	
	
	@GET
	@Path("/processRoles")
	@Produces("application/json")
	public String getAllProcessRoles() {
		
		logger.info("getAllProcessRoles");
		
		Gson gson = new Gson();
		return gson.toJson(employeeMapper.getAllProcessRoles());
	}
	
	@GET
	@Path("/roles")
	@Produces("application/json")
	public String getAllRoles() {
		
		logger.info("getAllProcessRoles");
		
		Gson gson = new Gson();
		jsonResponse=gson.toJson(employeeMapper.getAllRoles());
		
		return jsonResponse; 
	}
	
		
	@PUT
	@Path("/processRoles/{processRole}/{user}")
	@Produces("application/json")
	@Consumes("application/json")
	public String insertProcessRoleMembers(@PathParam("processRole") String processRole,@PathParam("user") String user,String jsonRequest) {
		logger.info("insertRoleMembers");

		String url = "/group/" + processRole +"/members/" +user ;
		
		Response resp = restClient.urlPutResp(url, getGroupMembersPayLoad(jsonRequest)); 
		
		logger.info("response object:" + resp.getStatus());
		logger.info("response body:" + resp.readEntity(String.class));
		
		if (resp.getStatus() == 204)
		{
			employeeMapper.insertUserProcessRoles(processRole,user);
			
			return "{\"result\":\"added\"}";
		}
		else
			return "{\"result\":\"not added\"}";
	}
	
	
	@PUT
	@Path("/roles/{role}/{user}")
	@Produces("application/json")
	@Consumes("application/json")
	public String insertRoleMembers(@PathParam("role") String role,@PathParam("user") String user,String jsonRequest) {
		logger.info("insertRoleMembers");

		String url = "/group/" + role +"/members/" +user ;
		
		Response resp = restClient.urlPutResp(url, getGroupMembersPayLoad(jsonRequest)); 
		
		logger.info("response object:" + resp.getStatus());
		logger.info("response body:" + resp.readEntity(String.class));
		
		if (resp.getStatus() == 204)
		{
			
			employeeMapper.insertUserRoles(role,user);
			
			return "{\"result\":\"added\"}";
		}
		else
			return "{\"result\":\"not added\"}";
	}
	
	public String getGroupMembersPayLoad(String jsonRequest) {
		String payLoad = " ";
		return payLoad;
	}
	
	@GET
	@Path("/rolesOfUsers/{loginId}")
	@Produces("application/json")
	@Consumes("application/json")
	public String getRoleOfUsers(@PathParam("loginId") String loginId) {
		logger.info("getRoleOfUsers");

		String url ="/identity/groups?userId="+loginId;
		return restClient.urlGet(url);
	}
	
	@DELETE
	@Path("/processRoles/{processRole}/{user}")
	@Produces("application/json")
	@Consumes("application/json")
	public String deleteProcessRoles(@PathParam("processRole") String processRole,@PathParam("user") String user) {
		logger.info("deleteGroupMembers");

		String url = "/group/" + processRole +"/members/" +user ;
		
		if(restClient.urlDelete(url)==null)
		{
			employeeMapper.deleteUserProcessRoles(processRole,user);
			
			return "{\"result\":\"deleted\"}";
		}
		else
			return "{\"result\":\"not deleted\"}";
			
	}
	
	@DELETE
	@Path("/userRoles/{role}/{user}")
	@Produces("application/json")
	@Consumes("application/json")
	public String deleteRoles(@PathParam("role") String role,@PathParam("user") String user) {
		logger.info("deleteGroupMembers");

		String url = "/group/" + role +"/members/" +user ;
		
		if(restClient.urlDelete(url)==null)
		{
			employeeMapper.deleteUserRoles(role,user);
			
			return "{\"result\":\"deleted\"}";
		}
		else
			return "{\"result\":\"not deleted\"}";
			
	}
	
}