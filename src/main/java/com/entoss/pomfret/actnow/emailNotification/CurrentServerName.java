package com.entoss.pomfret.actnow.emailNotification;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class CurrentServerName {
	
	String hostname;
	
	public String getServerName()
	{
		try {
			hostname=InetAddress.getLocalHost().getHostName();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return hostname;
	}
	
	/*public String serverName="";

	public static CurrentServerName getServer() {
		 
		HttpServletRequest request = (HttpServletRequest)FacesContext.getCurrentInstance().getExternalContext().getRequest();
		int port=request.getLocalPort();
		String serverName=request.getServerName();
		String ipo=request.getLocalAddr();
		String dat=request.getLocalName();
		String ports=Integer.toString(port);

		CurrentServerName get=new CurrentServerName();
		 get.serverName=serverName;
		 return get;
		 
			
    }*/
}
