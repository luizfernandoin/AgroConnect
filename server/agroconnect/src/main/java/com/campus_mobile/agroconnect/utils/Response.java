package com.campus_mobile.agroconnect.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    private boolean success;
    private String status;
    private String message;
    private T data;

    public Response(boolean success, String status, String message) {
        this.status = status;
        this.message = message;
        this.data = null;
    }
}

