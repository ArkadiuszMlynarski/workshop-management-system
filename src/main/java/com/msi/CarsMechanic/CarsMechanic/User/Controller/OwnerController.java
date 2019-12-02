package com.msi.CarsMechanic.CarsMechanic.User.Controller;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Service.IssueService;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Service.OpinionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/owner")
@CrossOrigin("*")
public class OwnerController {

    @Autowired
    IssueService issueService;

    @Autowired
    OpinionService opinionService;

    @GetMapping("/getIssues")
    public Iterable<Issue> getAllIssues(Principal principal) {
        return issueService.findAllIssuesForOwner(principal.getName());
    }

    @GetMapping("/getIssuesOffered")
    public Iterable<Issue> getAllIssuesOffered(Principal principal) {
        return issueService.findAllIssuesOfferedByUser(principal.getName());
    }

    //OPINIONS
    @PatchMapping("/reportOpinion/{opinionId}")
    public ResponseEntity<?> reportOpinion(@PathVariable Long opinionId, Principal principal){
        Opinion opinion = opinionService.reportOpinion(opinionId, principal.getName());
        return new ResponseEntity<>(opinion, HttpStatus.OK);
    }

    @PatchMapping("/unreportOpinion/{opinionId}")
    public ResponseEntity<?> unreportOpinion(@PathVariable Long opinionId, Principal principal){
        Opinion opinion = opinionService.unreportOpinion(opinionId, principal.getName());
        return new ResponseEntity<>(opinion, HttpStatus.OK);
    }


}
