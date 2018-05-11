package com.entoss.pomfret.actnow.daas;

import org.apache.ibatis.annotations.Param;
import org.mybatis.cdi.Mapper;

@Mapper
public interface AuditRecordMapper {
	
	//public void insertAuditRecordMapper(AuditRecord auditRecord);
	
	public void insertAuditRecordMapper(@Param("method") String method,@Param("url") String url, @Param("request") String request,@Param("response") String response);

}
