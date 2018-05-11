package com.entoss.pomfret.actnow.claims.service;

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

import com.entoss.actnow.domain.Department;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.entoss.pomfret.actnow.daas.DepartmentMapper;
import com.google.gson.Gson;

@Path("/department")
public class DepartmentService {

	@Inject
	DepartmentMapper departmentMapper;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	
	String subUrl="/department";
	String jsonResponse;

	@GET
	@Produces("application/json")
	public String getAllDepartment() {
		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(departmentMapper.getAllDepartments());
		
		return jsonResponse; 

	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public String getDepartmentById(@PathParam("id") int id) {
		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(departmentMapper.getDepartmentById(id));
		
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/"+id," ",jsonResponse);
		return jsonResponse; 
	}

	@GET
	@Path("/dept/{uniqueId}")
	@Produces("application/json")
	public String getDepartmentByUniqueId(@PathParam("uniqueId") String uniqueId) {
		Gson gson = new Gson();
		
		jsonResponse=gson.toJson(departmentMapper.getDepartmentByUniqueId(uniqueId));
		
		return jsonResponse; 
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertDepartment(String jsonRequest) {
		Gson gson = new Gson();
		Department[] departments = gson.fromJson(jsonRequest, Department[].class);
		for (Department department : departments) {
			departmentMapper.insertDepartment(department);
			
		}
		
		return "{\"result\":\"SUCCESS\"}";

	}

	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateDepartment(String jsonRequest) {
		Gson gson = new Gson();
		Department[] departments = gson.fromJson(jsonRequest, Department[].class);
		for (Department department : departments) {
		departmentMapper.updateDepartment(department);
		}
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@DELETE
	@Path("/{id}")
	public String deleteDepartment(@PathParam("id") int id) {
		departmentMapper.deleteDepartment(id);
		
		
		return "{\"result\":\"SUCCESS\"}";

	}

}
