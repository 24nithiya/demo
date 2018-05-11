package com.entoss.pomfret.actnow.emailNotification;

import java.io.Serializable;

import javax.annotation.Resource;
import javax.enterprise.context.SessionScoped;
import javax.faces.bean.ManagedBean;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@ManagedBean
@SessionScoped

public class EmailNotification implements Serializable {
	
	private static final long serialVersionUID = 1544680932114626710L;
	
	Logger logger = LogManager.getLogger(EmailNotification.class);

	   /**
	    * Resource for sending the email. The mail subsystem is defined in either standalone.xml or domain.xml in your respective
	    * configuration directory.
	    */

	    @Resource(mappedName = "java:jboss/mail/gmail")
	   private Session mySession;

	  /* private String to;

	   private String from;

	   private String subject;

	   private String body;

	   public String getTo() {
	       return to;
	   }

	   public void setTo(String to) {
	       this.to = to;
	   }

	   public String getFrom() {
	       return from;
	   }

	   public void setFrom(String from) {
	       this.from = from;
	   }

	   public String getSubject() {
	       return subject;
	   }

	   public void setSubject(String subject) {
	       this.subject = subject;
	   }

	   public String getBody() {
	       return body;
	   }

	   public void setBody(String body) {
	       this.body = body;
	   }

	   *//**
	    * Method to send the email based upon values entered in the JSF view. Exception should be handled in a production usage but
	    * is not handled in this example.
	    *
	    * @throws Exception
	    */
	   
	   public void send(String to,String from,String subject,String body) throws Exception {
	       /*
	       String to="srajanishmaharana@gmail.com";
	       String from="maharanarajanish@gmail.com";
	       String subject="something";
	       String body="check";*/
	       logger.info("Given values are-------"+to+"_"+from+"_"+subject+"_"+body);
	       Message message = new MimeMessage(mySession);
	       logger.info("messages:"+message);
	       message.setFrom(new InternetAddress(from));
	       Address toAddress = new InternetAddress(to);
	       logger.info("toAddress:"+toAddress);
	       message.addRecipient(Message.RecipientType.TO, toAddress);
	       message.setSubject(subject);
	       message.setContent(body, "text/html");
	       Transport.send(message);
	   }

}
