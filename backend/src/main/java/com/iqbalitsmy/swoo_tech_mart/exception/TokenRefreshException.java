package com.iqbalitsmy.swoo_tech_mart.exception;

public class TokenRefreshException extends RuntimeException{
    public TokenRefreshException(String token, String message){
        super(String.format("Failed for token [%s]: %s", token, message));
    }
}
