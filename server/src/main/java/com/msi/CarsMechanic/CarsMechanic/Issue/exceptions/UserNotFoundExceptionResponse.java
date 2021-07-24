package com.msi.CarsMechanic.CarsMechanic.Issue.exceptions;

public class UserNotFoundExceptionResponse {

    private String UserNotFound;

    public UserNotFoundExceptionResponse(String userNotFound) {
        UserNotFound = userNotFound;
    }

    public String getUserNotFound() {
        return UserNotFound;
    }

    public void setUserNotFound(String userNotFound) {
        UserNotFound = userNotFound;
    }
}
