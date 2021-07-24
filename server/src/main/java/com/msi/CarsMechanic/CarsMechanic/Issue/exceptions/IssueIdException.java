package com.msi.CarsMechanic.CarsMechanic.Issue.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IssueIdException extends RuntimeException {

    public IssueIdException(String message) {
        super(message);
    }
}
