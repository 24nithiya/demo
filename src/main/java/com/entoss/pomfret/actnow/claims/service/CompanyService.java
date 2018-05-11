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

import com.entoss.actnow.domain.Company;
import com.entoss.pomfret.actnow.daas.CompanyMapper;
import com.google.gson.Gson;

@Path("/companies")
public class CompanyService {

	@Inject
	CompanyMapper companyMapper;

	@GET
	@Produces("application/json")
	public String getAllCompanies() {
		Gson gson = new Gson();
		return gson.toJson(companyMapper.getAllCompanies());
	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public String getCompanyById(@PathParam("id") int id) {
		Gson gson = new Gson();
		return gson.toJson(companyMapper.getCompanyById(id));
	}

	@GET
	@Path("/dept/{uniqueId}")
	@Produces("application/json")
	public String getCompanyOfDepartmentByUniqueId(@PathParam("uniqueId") String uniqueId) {
		Gson gson = new Gson();
		return gson.toJson(companyMapper.getCompanyOfDepartmentByUniqueId(uniqueId));
	}

	@GET
	@Path("/bu/{uniqueId}")
	@Produces("application/json")
	public String getCompanyOfBusinessUnitByUniqueId(@PathParam("uniqueId") String uniqueId) {
		Gson gson = new Gson();
		return gson.toJson(companyMapper.getCompanyOfBusinessUnitByUniqueId(uniqueId)); 
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertCompany(String jsonRequest) {
		Gson gson = new Gson();
		Company company = gson.fromJson(jsonRequest, Company.class);
		companyMapper.insertCompany(company);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateEmployee(String jsonRequest) {
		Gson gson = new Gson();
		Company company = gson.fromJson(jsonRequest, Company.class);
		companyMapper.updateCompany(company);
		
		return "{\"result\":\"SUCCESS\"}";
	}

	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public String deleteCompany(@PathParam("id") int id) {
		companyMapper.deleteCompany(id);
		return "{\"result\":\"SUCCESS\"}";
	}
}
