package com.entoss.pomfret.actnow.security;
import java.util.Enumeration;
import java.util.Map;

import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
@ManagedBean(name = "helloWorld")
public class GetSession {
   
   
	 public GetSession() {
	      //System.out.println("HelloWorld started!");
	   }
	 
	 
		
	  /* public String getMessage() {
		   FacesContext facesContext = FacesContext.getCurrentInstance();
		   HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);
		   Enumeration e = session.getAttributeNames();
		   String temp="";
		   while (e.hasMoreElements())
		   {
		     String attr = (String)e.nextElement();
		     System.err.println("      attr  = "+ attr);
		     Object value = session.getValue(attr);
		     System.err.println("      value = "+ value);
		     temp+=value+"\n";
		   }
	      return temp;
	   }
	   */
	   public String getSession(){
		  		   
	String s=FacesContext.getCurrentInstance().getExternalContext().getRemoteUser();
		  		  
		   return s;
	   }
   
}