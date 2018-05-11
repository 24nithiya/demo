package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.PropertySet;

@Mapper
public interface PropertySetMapper {
	
	public void insertProperty(PropertySet property);
	
	public PropertySet getPropertySetById(Integer id);
	
	public List<PropertySet> getFilteredPropertySet(@Param("propertyName")String propertyName,@Param("country")String country,@Param("roles")String roles,@Param("companyId") Integer companyId);
	
	public List<PropertySet> getAllPropertySets();
	
	public void updatePropertySet(PropertySet property);
	
	public void deletePropertySet(Integer id);

}
