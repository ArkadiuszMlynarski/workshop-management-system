package com.msi.CarsMechanic.CarsMechanic.Issue.exceptions;

public class IssueIdExceptionResponse {

    private String id;

    public IssueIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
