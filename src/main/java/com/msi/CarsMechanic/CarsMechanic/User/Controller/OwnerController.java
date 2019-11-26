package com.msi.CarsMechanic.CarsMechanic.User.Controller;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/owner")
@CrossOrigin("*")
public class OwnerController {

    @Autowired
    IssueService issueService;

    @GetMapping("/getIssues")
    public Iterable<Issue> getAllIssues(Principal principal) {
        return issueService.findAllIssuesForOwner(principal.getName());
    }

    @GetMapping("/getIssuesOffered")
    public Iterable<Issue> getAllIssuesOffered(Principal principal) {
        return issueService.findAllIssuesOfferedByUser(principal.getName());
    }

}
