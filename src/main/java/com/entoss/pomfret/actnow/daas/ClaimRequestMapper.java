package com.entoss.pomfret.actnow.daas;

import java.util.List;
import java.util.UUID;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.travel.ClaimRequest;

@Mapper
public interface ClaimRequestMapper {
	
	ClaimRequest findClaimById(UUID applicationId);
	
	List<ClaimRequest> findAllClaims();
	
	List<ClaimRequest> findClaimsByEmployeeId(Integer employeeId);
	
	void createClaim(ClaimRequest claimRequest);
	
	public void updateClaim(ClaimRequest claimRequest);
	
	public void deleteClaim(Integer claimId);

	String getTaskId(UUID applicationId);
	
	public UUID getProcessInstanceId(UUID applicationId);
	
	public String getEmployeeEmailId(Integer employeeId);
	
	public String getEmployeeLoginId(Integer employeeId);

}
