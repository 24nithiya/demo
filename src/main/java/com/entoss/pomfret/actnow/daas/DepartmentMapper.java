package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.Department;

@Mapper
public interface DepartmentMapper {
	
	public void insertDepartment(Department department);
	
	public Department getDepartmentById(Integer id);
	
	public List<Department> getAllDepartments();
	
	public List<Department> getDepartmentByUniqueId(String uniqueId);
	
	public void updateDepartment(Department department);
	
	public void deleteDepartment(Integer id);
	

}
