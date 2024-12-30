package com.campus_mobile.agroconnect.model;

public enum UserRole {
    ADMIN("admin"),
    PRODUCER("producer"),
    CUSTOMER("customer");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
