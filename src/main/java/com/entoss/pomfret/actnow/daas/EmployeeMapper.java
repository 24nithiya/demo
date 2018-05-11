package com.entoss.pomfret.actnow.daas;

import java.util.List;


import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.Employee;
import com.entoss.actnow.domain.ProcessRoles;
import com.entoss.actnow.domain.Roles;

@Mapper
public interface EmployeeMapper {

	public void insertEmployee(Employee employee);

	public Employee getEmployeeById(Integer employeeId);

	public Employee getEmployeeByLoginId(String loginId);

	public List<Employee> getAllEmployees();

	public List<Employee> getEmployeeBycmpnyId(Integer cmpnyId);

	public List<Employee> getEmployeeByBuId(Integer buId);

	public List<Employee> getEmployeeByDeptId(Integer deptId);

	public void updateEmployee(Employee employee);

	public void deleteEmployee(Integer employeeId);
	
	public void deleteEmployeeByLoginId(String loginId);

	public String getManagerByEmployeeId(Integer employeeId);

	public String getManagerByLoginId(String loginId);

	public Employee getManagerDetailsByEmployeeId(Integer employeeId);
	
	public List<ProcessRoles> getAllProcessRoles();
	
	public List<Roles> getAllRoles();
	
	public void insertUserProcessRoles(@Param("processRole") String processRole,@Param("user") String user);
	
	public void deleteUserProcessRoles(@Param("processRole") String processRole,@Param("user") String user);
	
	public void insertUserRoles(@Param("role") String role,@Param("user") String user);
	
	public void deleteUserRoles(@Param("role") String role,@Param("user") String user);
	
	//public void insertUserProcessRoles(@Param("processRole") String processRole,@Param("user") String user);
	
	//public void insertRoles(@Param("roleId") String roleId,@Param("roleName") String roleName,@Param("roleType") String roleType);


}
