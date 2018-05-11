package com.entoss.pomfret.actnow.claims.service;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.entoss.actnow.domain.Organization;
import com.entoss.pomfret.actnow.daas.OrganizationMapper;
import com.google.gson.Gson;

@Path("/organizations")
public class OrganizationService {

	@Inject
	OrganizationMapper organizationMapper;

	@GET
	@Produces("application/json")
	public String getAllOrganizations() {
		Gson gson = new Gson();
		
		return gson.toJson(organizationMapper.getAllOrganizations()); 
	}

	@GET
	@Path("/{organizationId}")
	@Produces("application/json")
	public String getOrganizationById(@PathParam("organizationId") int organizationId) {
		Gson gson = new Gson();
		
		return gson.toJson(organizationMapper.getOrganizationById(organizationId));
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertOrganization(String jsonRequest) {
		Gson gson = new Gson();
		Organization organization = gson.fromJson(jsonRequest, Organization.class);
		organizationMapper.insertOrganization(organization);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateOrganization(String jsonRequest) {
		Gson gson = new Gson();
		Organization organization = gson.fromJson(jsonRequest, Organization.class);
		organizationMapper.updateOrganization(organization);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@DELETE
	@Path("/{organizationId}")
	@Produces("application/json")
	public String deleteOrganization(@PathParam("organizationId") int organizationId) {
		
		organizationMapper.deleteOrganization(organizationId);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
}