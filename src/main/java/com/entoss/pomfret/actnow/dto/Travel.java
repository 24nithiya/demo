package com.entoss.pomfret.actnow.dto;

import java.util.Date;

public class Travel {
	
	String travelRequestId;
	String travelMode; 
	String travelClass;
	Date startDate;
	Date endDate;
	
	public String getTravelRequestId() {
		return travelRequestId;
	}
	public void setTravelRequestId(String travelRequestId) {
		this.travelRequestId = travelRequestId;
	}
	public String getTravelMode() {
		return travelMode;
	}
	public void setTravelMode(String travelMode) {
		this.travelMode = travelMode;
	}
	public String getTravelClass() {
		return travelClass;
	}
	public void setTravelClass(String travelClass) {
		this.travelClass = travelClass;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	
}
