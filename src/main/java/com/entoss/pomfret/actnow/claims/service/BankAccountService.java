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

import com.entoss.actnow.domain.BankAccount;
import com.entoss.pomfret.actnow.constants.AuditConstants;
import com.entoss.pomfret.actnow.daas.AuditRecordMapper;
import com.entoss.pomfret.actnow.daas.BankAccountMapper;
import com.entoss.pomfret.actnow.exception.BankAccountNotFoundException;
import com.google.gson.Gson;

@Path("/bankaccount")
public class BankAccountService {

	@Inject
	BankAccountMapper bankAccountMapper;
	
	@Inject
	AuditRecordMapper auditRecordMapper;
	
	String subUrl="/bankaccount";
	String jsonResponse;

	@GET
	@Produces("application/json")
	public String getAllBankAccounts() {
		Gson gson = new Gson();
		jsonResponse=gson.toJson(bankAccountMapper.getAllBankAccounts());
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl, jsonResponse,HttpMethod.GET);
		return jsonResponse;
	}

	@GET
	@Path("/{empId}")
	@Produces("application/json")
	public String getBankAccountByEmpId(@PathParam("empId") int empId) {
		Gson gson = new Gson();
		String jsonResponse = gson.toJson(bankAccountMapper.getBankAccountByEmpId(empId));
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.GET,AuditConstants.url+subUrl+"/"+empId," ",jsonResponse);
		if(jsonResponse.equals("[]") || jsonResponse == null) {
			throw new BankAccountNotFoundException("Bank account associated with employee id "
			+empId+" not found.");
		}
		return jsonResponse;
	}

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public String insertBankAccount(String jsonRequest) {
		Gson gson = new Gson();
		BankAccount bankAccount = gson.fromJson(jsonRequest, BankAccount.class);
		bankAccountMapper.insertBankAccount(bankAccount);
		
		auditRecordMapper.insertAuditRecordMapper(HttpMethod.POST,AuditConstants.url+subUrl,jsonRequest," ");
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public String updateBankAccount(String jsonRequest) {
		Gson gson = new Gson();
		BankAccount bankAccount = gson.fromJson(jsonRequest, BankAccount.class);
		bankAccountMapper.updateBankAccount(bankAccount);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl," ",HttpMethod.PUT);
		
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
	@DELETE
	@Path("/{bankAccountId}")
	@Produces("application/json")
	public String deleteBankAccount(@PathParam("bankAccountId") int bankAccountId) {
		
		bankAccountMapper.deleteBankAccount(bankAccountId);
		
		//auditRecordMapper.insertAuditRecordMapper(AuditConstants.url+subUrl+"/"+bankAccountId," ",HttpMethod.DELETE);
		return "{\"result\":\"SUCCESS\"}"; 
	}
	
}