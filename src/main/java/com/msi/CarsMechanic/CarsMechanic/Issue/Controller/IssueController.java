package com.msi.CarsMechanic.CarsMechanic.Issue.Controller;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Service.IssueService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/issue")
@CrossOrigin
public class IssueController {

    @Autowired
    private IssueService issueService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/add")
    public ResponseEntity<?> createNewIssue(@Valid @RequestBody Issue issue, BindingResult result, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        issue.setCreationDate(LocalDateTime.now());
        Issue issue1 = issueService.saveOrUpdateIssue(issue, principal.getName());
        return new ResponseEntity<Issue>(issue, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteWorkshopById(@PathVariable Long id, Principal principal){
        issueService.deleteIssueById(id, principal.getName());
        return new ResponseEntity<String>("Issue with ID: "+id+" deleted.",HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public Iterable<Issue> getAllIssues(Principal principal){
        return issueService.findAllIssues(principal.getName());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> getIssueById(@PathVariable Long id, Principal principal){
        Issue issue = issueService.findByIssueId(id, principal.getName());
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }
}
