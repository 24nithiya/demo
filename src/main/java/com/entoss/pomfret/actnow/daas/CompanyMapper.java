package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.Company;

@Mapper
public interface CompanyMapper {

	public void insertCompany(Company company);

	public Company getCompanyById(Integer id);

	public List<Company> getAllCompanies();

	public void updateCompany(Company company);

	public void deleteCompany(Integer id);
	
	public Company getCompanyByUniqueId(String uniqueId);

	public List<Company> getCompanyOfDepartmentByUniqueId(String uniqueId);

	public List<Company> getCompanyOfBusinessUnitByUniqueId(String uniqueId);

	

}
