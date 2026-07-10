package com.iqbalitsmy.swoo_tech_mart.exception;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e, HttpServletRequest request){
        return build(HttpStatus.NOT_FOUND, e.getMessage(), request, null);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExistsException(EmailAlreadyExistsException e, HttpServletRequest request){
        return build(HttpStatus.CONFLICT, e.getMessage(), request, null);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e, HttpServletRequest request){
        return build(HttpStatus.BAD_REQUEST, e.getMessage(), request, null);
    }

    @ExceptionHandler(TokenRefreshException.class)
    public ResponseEntity<ErrorResponse> handleTokenRefreshException(TokenRefreshException e, HttpServletRequest request){
        return build(HttpStatus.FORBIDDEN, e.getMessage(), request, null);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialException(BadCredentialsException e, HttpServletRequest request){
        return build(HttpStatus.UNAUTHORIZED, e.getMessage(), request, null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException e, HttpServletRequest request){
        return build(HttpStatus.FORBIDDEN, "You don't have permission to perform this action", request, null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request){
        Map<String, String> fieldErrors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach((fe) -> {
            fieldErrors.put(fe.getField(), fe.getDefaultMessage());
        });
        return build(HttpStatus.BAD_REQUEST, "Validation failed", request, fieldErrors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e, HttpServletRequest request){
        return build(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), request, null);
    }

    private ResponseEntity<ErrorResponse> build(HttpStatus status, String message, HttpServletRequest request, Map<String, String> fieldErrors){
        ErrorResponse body = new ErrorResponse(
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getRequestURI(),
                fieldErrors
        );
        return new ResponseEntity<>(body, status);
    }

}
