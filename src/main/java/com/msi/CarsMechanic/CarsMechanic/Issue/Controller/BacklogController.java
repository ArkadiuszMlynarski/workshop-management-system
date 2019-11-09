package com.msi.CarsMechanic.CarsMechanic.Issue.Controller;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.IssueTask;
import com.msi.CarsMechanic.CarsMechanic.Issue.Service.IssueTaskService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/issue/backlog")
@CrossOrigin()
public class BacklogController {

    @Autowired
    private IssueTaskService issueTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addIssueToBacklog(@Valid @RequestBody IssueTask issueTask,
                                               BindingResult result, @PathVariable Long backlog_id, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        IssueTask issueTask1 = issueTaskService.addIssueTask(backlog_id, issueTask, principal.getName());

        return new ResponseEntity<IssueTask>(issueTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<IssueTask> getIssueBacklog(@PathVariable Long backlog_id, Principal principal){
        return issueTaskService.findBacklogById(backlog_id, principal.getName());
    }

    @GetMapping("/{backlog_id}/{is_id}")
    public ResponseEntity<?> getIssueTask(@PathVariable String backlog_id, @PathVariable String is_id, Principal principal){
        IssueTask issueTask = issueTaskService.findPTByIssueSequence(Long.valueOf(backlog_id), is_id, principal.getName());
        return new ResponseEntity<IssueTask>(issueTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{is_id}")
    public ResponseEntity<?> updateIssueTask(@Valid @RequestBody IssueTask issueTask, BindingResult result,
                                             @PathVariable String backlog_id, @PathVariable String is_id, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        IssueTask updatedTask = issueTaskService.updateByIssueSequence(issueTask, backlog_id, is_id, principal.getName());

        return new ResponseEntity<IssueTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{is_id}")
    public ResponseEntity<?> deleteIssueTask(@PathVariable String backlog_id, @PathVariable String is_id, Principal principal){
        issueTaskService.deletePTByIssueSequence(backlog_id, is_id, principal.getName());

        return new ResponseEntity<String>("Issue Task "+is_id+" was deleted successfully", HttpStatus.OK);

    }
}
