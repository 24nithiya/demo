package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.Organization;
 
@Mapper
public interface OrganizationMapper 
{
 
	 public void insertOrganization(Organization Organization);
	  
	 public Organization getOrganizationById(Integer OrganizationId);
	  
	 public List<Organization> getAllOrganizations();
	  
	 public void updateOrganization(Organization Organization);
	  
	 public void deleteOrganization(Integer OrganizationId);
  
}
