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
import javax.ws.rs.QueryParam;

import com.entoss.actnow.domain.PropertySet;
import com.entoss.pomfret.actnow.daas.PropertySetMapper;
import com.google.gson.Gson;

@Path("/propertysets")
public class PropertySetService {
	
	@Inject
	PropertySetMapper propertySetMapper;
	
	
	@GET
	@Produces("application/json")
	public String getAllPropertySets()
	{
		Gson gson=new Gson();
		
		return gson.toJson(propertySetMapper.getAllPropertySets());
	}
	
	@GET
	@Path("/id/{id}")
	@Produces("application/json")
	public String getPropertySetById(@PathParam("id") int id) {

		Gson gson = new Gson();
		
		return gson.toJson(propertySetMapper.getPropertySetById(id));
	}
	
	@GET
    @Path("/property")
	@Produces("application/json")
	public String getFilteredPropertySet(@QueryParam("propertyName") String propertyName,
			                     @QueryParam("country") String country,
			                     @QueryParam("roles") String roles,
			                     @QueryParam("companyId") Integer companyId)
	{
	
		if(propertyName!=null || country!=null || roles !=null || companyId !=null){
			Gson gson = new Gson();
			
			return gson.toJson(propertySetMapper.getFilteredPropertySet(propertyName,country,roles,companyId));
		}else{
			return null;
		}
	
	}
	
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertProperty(String jsonRequest) {
		Gson gson = new Gson();
		PropertySet[] propertySet = gson.fromJson(jsonRequest, PropertySet[].class);
		for(PropertySet propertysets :propertySet){
		propertySetMapper.insertProperty(propertysets);
		}
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updatePropertySet(String jsonRequest) {
		Gson gson = new Gson();
		PropertySet propertySet = gson.fromJson(jsonRequest, PropertySet.class);
		propertySetMapper.updatePropertySet(propertySet);
		
		return "{\"result\":\"SUCCESS\"}"; 
	
	}
	
	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public String deleteEmployee(@PathParam("id") int id) {		
		propertySetMapper.deletePropertySet(id);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}

}
