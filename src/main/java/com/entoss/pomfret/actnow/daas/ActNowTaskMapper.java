package com.entoss.pomfret.actnow.daas;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

import com.entoss.actnow.domain.ActNowTask;
 
@Mapper
public interface ActNowTaskMapper 
{
 
	 public void insertActNowTask(ActNowTask actNowTask);
	  
	 public ActNowTask getActNowTaskById(String actNowTaskId);
	  
	 public List<ActNowTask> getAllActNowTasks();
	 
	 public List<ActNowTask> getAllActNowTasksByAssignee(String assignee);
	 
	 public List<ActNowTask> getAllActNowTasksByOwner(String owner);
	 
	 public List<ActNowTask> getAllActNowTasksByAssigneeOwner(
			 @Param("assignee") String assignee, @Param("owner") String owner);
	  
	 public void updateActNowTask(ActNowTask actNowTask);
	 
	 public void updateActNowTaskSetDates(ActNowTask actNowTask);
	 
	 public void deleteActNowTask(String actNowTaskId);
	 
	 public void createTaskHistory(String taskId);
  
}
