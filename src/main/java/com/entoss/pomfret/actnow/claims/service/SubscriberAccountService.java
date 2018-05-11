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

import com.entoss.actnow.domain.SubscriberAccount;
import com.entoss.pomfret.actnow.daas.SubscriberAccountMapper;
import com.google.gson.Gson;

@Path("/subscriberaccount")
public class SubscriberAccountService {

	@Inject
	SubscriberAccountMapper subscriberAccountMapper;

	@GET
	@Produces("application/json")
	public String getAllSubscriberAccounts() {
		Gson gson = new Gson();
		return gson.toJson(subscriberAccountMapper.getAllSubscriberAccounts());
	}

	@GET
	@Path("/{subscriberId}")
	@Produces("application/json")
	public String getSubscriberAccountById(@PathParam("subscriberId") int subscriberAccountId) {
		Gson gson = new Gson();
		return gson.toJson(subscriberAccountMapper.getSubscriberAccountById(subscriberAccountId));
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertSubscriberAccount(String jsonRequest) {
		Gson gson = new Gson();
		SubscriberAccount subscriberAccount = gson.fromJson(jsonRequest, SubscriberAccount.class);
		subscriberAccountMapper.insertSubscriberAccount(subscriberAccount);
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateSubscriberAccount(String jsonRequest) {
		Gson gson = new Gson();
		SubscriberAccount subscriberAccount = gson.fromJson(jsonRequest, SubscriberAccount.class);
		subscriberAccountMapper.updateSubscriberAccount(subscriberAccount);
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@DELETE
	@Path("/{subscriberId}")
	@Produces("application/json")
	public String deleteSubscriberAccount(@PathParam("subscriberId") int subscriberAccountId) {
		
		subscriberAccountMapper.deleteSubscriberAccount(subscriberAccountId);
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
}