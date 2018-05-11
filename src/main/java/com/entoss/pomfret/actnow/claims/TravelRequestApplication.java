package com.entoss.pomfret.actnow.claims;

import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;
import org.camunda.bpm.application.PostDeploy;

import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.variable.Variables;

@ProcessApplication("Travel Expense Management")
public class TravelRequestApplication extends ServletProcessApplication {
	
	/* Uncomment the below for auto invokation 
	@PostDeploy
	  public void startCaseInstance(ProcessEngine processEngine) {
	    CaseService caseService = processEngine.getCaseService();
	    caseService.createCaseInstanceByKey("travel_expense_management",
	        Variables.createVariables()
	          .putValue("applicationStatus", "STARTED")
	          .putValue("rating", Variables.integerValue(null)));

	  }
	  */
  
}