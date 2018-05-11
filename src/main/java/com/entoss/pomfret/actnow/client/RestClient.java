package com.entoss.pomfret.actnow.client;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class RestClient {
	
	public static Logger logger = LogManager.getLogger(RestClient.class);
	
	//public static final String SERVER_URL = "http://localhost:8080/engine-rest";
	
	public static StringBuilder serverUrl = new StringBuilder();
	
	public static String filename = "config.properties";
	
	public static Properties prop = new Properties();
	
	public static InputStream input = null;
	
	static {
		
		input = RestClient.class.getClassLoader().getResourceAsStream(filename);
		
		if(input==null){
			logger.error("input: Sorry, unable to find " + filename);
		}
		
		try {
			prop.load(input);
			
			logger.info("Loaded " + filename);
			
			serverUrl.append("http://" + prop.getProperty("hostname"));
			if(prop.getProperty("port")!=null) {
				serverUrl.append(":" + prop.getProperty("port"));
			}
			serverUrl.append("/" + prop.getProperty("context"));
			
			logger.info("ServerContext " + serverUrl);
		} catch (IOException e) {
			logger.error("Sorry, unable to find " + filename);
			//e.printStackTrace();
		}
		
	}
	
	//singleton class
	private static RestClient instance = null;
	
	private RestClient(){}
	
	public static RestClient getRestClientInstance()
	{
		if(instance==null) {
			instance = new RestClient();
		}
		return instance;
	}

	public String urlGet(String url) {
		logger.info("urlGet: "+ serverUrl + url);
		return ClientBuilder.newClient().target(serverUrl + url).request().get(String.class);
	}
	
	public String urlDelete(String url) {
		logger.info("urlDelete:"+ serverUrl + url);
		return ClientBuilder.newClient().target(serverUrl + url).request().delete(String.class);
	}
	
	
	public String urlPost(String url, String payLoad) {
		logger.info("urlPost: "+ serverUrl + url);
		try {
		return ClientBuilder.newClient().target(serverUrl + url).request().post(
				Entity.entity(payLoad, MediaType.APPLICATION_JSON),	String.class);
		} 
		catch(WebApplicationException ex ) {
			return "urlPost() ExceptionMessage: "+ex.getResponse().readEntity(String.class);
		}
		catch(Exception ex ) {
			return "urlPost() GenericException ";
		}
	}
	
	public Response urlPostResp(String url, String payLoad) {
		logger.info("urlPostResp: "+ serverUrl + url);
		Response response = null; 
		try {
			response = ClientBuilder.newClient().target(serverUrl + url).request().post(
				Entity.entity(payLoad, MediaType.APPLICATION_JSON),	Response.class);
		} 
		catch(WebApplicationException ex ) {
			response= ex.getResponse();
			logger.error("urlPost() WebApplicationException..");
		}
		catch(Exception ex ) {
			logger.error("urlPost() GenericException..");
		}
		return response;
	}
	
	public Response urlPutResp(String url, String payLoad) {
		logger.info("urlPutResp: "+ serverUrl + url);
		Response response = null; 
		try {
			response = ClientBuilder.newClient().target(serverUrl + url).request().put(
				Entity.entity(payLoad, MediaType.APPLICATION_JSON),	Response.class);
			
		} 
		catch(WebApplicationException ex ) {
			response= ex.getResponse();
			logger.error("urlPut() WebApplicationException..");
			
		}
		catch(Exception ex ) {
			logger.error("urlPut() GenericException..");
			logger.error(ex.getCause());
		
		}
		return response;
	}
	//for creating group members
}
