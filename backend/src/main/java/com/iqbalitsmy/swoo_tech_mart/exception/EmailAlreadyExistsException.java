package com.iqbalitsmy.swoo_tech_mart.exception;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException(String message){
        super(message);
    }
}
