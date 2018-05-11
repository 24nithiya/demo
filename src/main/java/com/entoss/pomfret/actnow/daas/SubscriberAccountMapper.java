package com.entoss.pomfret.actnow.daas;

import java.util.List;

import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.SubscriberAccount;
 
@Mapper
public interface SubscriberAccountMapper 
{
 
	 public void insertSubscriberAccount(SubscriberAccount subscriberAccount);
	  
	 public SubscriberAccount getSubscriberAccountById(Integer subscriberAccountId);
	  
	 public List<SubscriberAccount> getAllSubscriberAccounts();
	  
	 public void updateSubscriberAccount(SubscriberAccount subscriberAccount);
	  
	 public void deleteSubscriberAccount(Integer subscriberAccountId);
  
}
