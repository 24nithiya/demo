package com.entoss.pomfret.actnow.daas;

import java.io.InputStream;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.mybatis.cdi.SessionFactoryProvider;

public class SqlSessionFactoryProvider {
	
	@Produces
	@ApplicationScoped
	@SessionFactoryProvider
	public SqlSessionFactory createActnowDaasFactory() throws Exception {
		String resource = "mybatis-config.xml";
		 
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		return sqlSessionFactory;
	   
	}

}
