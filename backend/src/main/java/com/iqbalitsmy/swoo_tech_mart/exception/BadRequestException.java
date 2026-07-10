package com.iqbalitsmy.swoo_tech_mart.exception;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String message){
        super(message);
    }
}
