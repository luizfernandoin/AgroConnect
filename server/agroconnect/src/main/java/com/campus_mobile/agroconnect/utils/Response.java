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
    private String status;
    private String message;
    private T data;

    public Response(String status, String message) {
        this.status = status;
        this.message = message;
        this.data = null;
    }
}

