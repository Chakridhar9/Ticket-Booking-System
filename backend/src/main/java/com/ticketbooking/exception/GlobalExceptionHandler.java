package com.ticketbooking.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {

        Map<String, Object> response = new HashMap<>();
        response.put("error", ex.getMessage());
        response.put("status", 400);
        response.put("timestamp", new Date());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}