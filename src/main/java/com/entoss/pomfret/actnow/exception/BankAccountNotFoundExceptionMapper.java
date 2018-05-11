package com.entoss.pomfret.actnow.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.entoss.actnow.domain.ErrorMessage;

@Provider
public class BankAccountNotFoundExceptionMapper implements ExceptionMapper<BankAccountNotFoundException> {

	@Override
	public Response toResponse(BankAccountNotFoundException ex) {
		ErrorMessage errorMessage = new ErrorMessage(404, ex.getMessage());
		return Response.status(Status.NOT_FOUND).entity(errorMessage).build();
	}

}
