package com.entoss.pomfret.actnow.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.entoss.actnow.domain.ActNowTask;
import com.entoss.actnow.domain.ActnowDocument;
import com.entoss.actnow.domain.ActnowEvent;
import com.entoss.actnow.domain.ActnowNote;
import com.entoss.actnow.domain.Employee;

public class TravelRequest {
	
	Employee employee;
	UUID applicationUuid;
	int applicationId;
	String applicationStatus;
	Date createdAt;
	Date modifiedAt;
	String currency;
	String processInstanceId;
	String definitionId;
	ActNowTask actNowTask;
	List<ActnowDocument> referenceDocuments;
	List<ActnowNote> notes;
	List<ActnowEvent> history;
	
	public Employee getEmployee() {
		return employee;
	}
	public UUID getApplicationUuid() {
		return applicationUuid;
	}
	public int getApplicationId() {
		return applicationId;
	}
	public String getApplicationStatus() {
		return applicationStatus;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public Date getModifiedAt() {
		return modifiedAt;
	}
	public String getCurrency() {
		return currency;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	public String getDefinitionId() {
		return definitionId;
	}
	public ActNowTask getActNowTask() {
		return actNowTask;
	}
	public List<ActnowDocument> getReferenceDocuments() {
		return referenceDocuments;
	}
	public List<ActnowNote> getNotes() {
		return notes;
	}
	public List<ActnowEvent> getHistory() {
		return history;
	}
}
