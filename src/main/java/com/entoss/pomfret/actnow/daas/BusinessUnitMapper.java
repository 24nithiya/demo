package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.BusinessUnit;
 
@Mapper
public interface BusinessUnitMapper 
{
 
	 public void insertBusinessUnit(BusinessUnit businessUnit);
	  
	 public BusinessUnit getBusinessUnitById(Integer businessUnitId);
	  
	 public List<BusinessUnit> getAllBusinessUnits();
	 
	 public List<BusinessUnit> getBusineessUnitByUniqueId(String uniqueId);
	  
	 public void updateBusinessUnit(BusinessUnit businessUnit);
	  
	 public void deleteBusinessUnit(Integer businessUnitId);
  
}
