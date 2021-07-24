package com.msi.CarsMechanic.CarsMechanic.Issue.exceptions;

public class IssueNotFoundExceptionResponse {

    private String ProjectNotFound;

    public IssueNotFoundExceptionResponse(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
