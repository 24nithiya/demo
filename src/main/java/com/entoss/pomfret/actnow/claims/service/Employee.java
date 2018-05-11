package com.entoss.pomfret.actnow.claims.service;

import java.util.Date;

public class Employee {
	
	private long id;
	private String firstName;
	private String lastName;
	private String emailId;
	private String mobile;
	private String telephone;
	private char gender;
	private Date dateOfBirth;
	private long employeeId;
	private Date dateOfJoining;
	private long locationId;
	private long buId;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public char getGender() {
		return gender;
	}
	public void setGender(char gender) {
		this.gender = gender;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}
	public Date getDateOfJoining() {
		return dateOfJoining;
	}
	public void setDateOfJoining(Date dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}
	public long getLocationId() {
		return locationId;
	}
	public void setLocationId(long locationId) {
		this.locationId = locationId;
	}
	public long getBuId() {
		return buId;
	}
	public void setBuId(long buId) {
		this.buId = buId;
	}
	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + emailId
				+ ", mobile=" + mobile + ", telephone=" + telephone + ", gender=" + gender + ", dateOfBirth="
				+ dateOfBirth + ", employeeId=" + employeeId + ", dateOfJoining=" + dateOfJoining + ", locationId="
				+ locationId + ", buId=" + buId + "]";
	}
	
	
	
}