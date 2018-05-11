package com.entoss.pomfret.actnow.daas;

import java.util.List;
import java.util.UUID;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.travel.TravelRequest;

@Mapper
public interface TravelRequestMapper {
	
	TravelRequest findTravelRequestById(UUID applicationId);
	
	List<TravelRequest> findAllTravelRequests();
	
	List<TravelRequest> findTravelRequestByEmployeeId(Integer employeeId);
	
	void createTravelRequest(TravelRequest travelRequest);
	
	public void updateTravelRequest(TravelRequest travelRequest);
	
	public void deleteTravelRequest(UUID applicationId);
	
	public String getEmployeeEmailId(Integer employeeId);

}