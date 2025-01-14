package com.campus_mobile.agroconnect.infra;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ValidationErrorResponse {
    private int status;
    private String error;
    private List<String> fieldErrors;

    public ValidationErrorResponse(int status, String error, List<String> fieldErrors) {
        this.status = status;
        this.error = error;
        this.fieldErrors = fieldErrors;
    }
}

