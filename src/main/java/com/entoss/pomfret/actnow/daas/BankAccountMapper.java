package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.BankAccount;
 
@Mapper
public interface BankAccountMapper 
{
 
	 public void insertBankAccount(BankAccount bankAccount);
	  
	 public List<BankAccount> getBankAccountByEmpId(Integer empId);
	  
	 public List<BankAccount> getAllBankAccounts();
	  
	 public void updateBankAccount(BankAccount bankAccount);
	  
	 public void deleteBankAccount(Integer bankAccountId);
  
}
