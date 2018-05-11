package com.entoss.pomfret.actnow.exception;

public class BankAccountNotFoundException extends RuntimeException {

	/**
	 * This exception thrown when a bank account associated with
	 * employee id not found.
	 */
	private static final long serialVersionUID = 1L;
	
	public BankAccountNotFoundException(String message) {
		super(message);
	}

}
