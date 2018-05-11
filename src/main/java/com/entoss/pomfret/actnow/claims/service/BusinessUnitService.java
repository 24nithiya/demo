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

import com.entoss.actnow.domain.BusinessUnit;
import com.entoss.pomfret.actnow.daas.BusinessUnitMapper;
import com.google.gson.Gson;

@Path("/businessunits")
public class BusinessUnitService {

	@Inject
	BusinessUnitMapper businessUnitMapper;

	@GET
	@Produces("application/json")
	public String getAllBusinessUnits() {
		Gson gson = new Gson();
		return gson.toJson(businessUnitMapper.getAllBusinessUnits()); 
	}

	@GET
	@Path("/{businessUnitId}")
	@Produces("application/json")
	public String getBusinessUnitById(@PathParam("businessUnitId") int businessUnitId) {
		Gson gson = new Gson();
		
		return gson.toJson(businessUnitMapper.getBusinessUnitById(businessUnitId));
	}

	@GET
	@Path("/bu/{uniqueId}")
	@Produces("application/json")
	public String getBusineessUnitByUniqueId(@PathParam("uniqueId") String uniqueId) {
		Gson gson = new Gson();
		
		return gson.toJson(businessUnitMapper.getBusineessUnitByUniqueId(uniqueId));
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertBusinessUnit(String jsonRequest) {
		Gson gson = new Gson();
		BusinessUnit[] businessUnits = gson.fromJson(jsonRequest, BusinessUnit[].class);
		for (BusinessUnit businessunit : businessUnits) {
			businessUnitMapper.insertBusinessUnit(businessunit);
			
		}
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateBusinessUnit(String jsonRequest) {
		Gson gson = new Gson();
		BusinessUnit[] businessUnits = gson.fromJson(jsonRequest, BusinessUnit[].class);
		for (BusinessUnit businessunit : businessUnits) {
		businessUnitMapper.updateBusinessUnit(businessunit);
		}
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@DELETE
	@Path("/{businessUnitId}")
	@Produces("application/json")
	public String deleteBusinessUnit(@PathParam("businessUnitId") int businessUnitId) {

		businessUnitMapper.deleteBusinessUnit(businessUnitId);
		return "{\"result\":\"SUCCESS\"}";
	}

}