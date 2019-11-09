package com.msi.CarsMechanic.CarsMechanic.Issue.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Backlog;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.IssueTask;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.BacklogRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.IssueRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.IssueTaskRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.IssueNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private IssueTaskRepository issueTaskRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueService issueService;


    public IssueTask addIssueTask(Long id, IssueTask issueTask, String username){

            //ITs to be added to a specific issue, issue != null, BL exists
            Backlog backlog = issueService.findByIssueId(id, username).getBacklog(); // backlogRepository.findByTaskid(id);
            //set the bl to IT
            issueTask.setBacklog(backlog);

            Integer BacklogSequence = backlog.getPTSequence();
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);
            issueTask.setIssueSequence(backlog.getTaskid() + "-" + BacklogSequence);
            issueTask.setIssueId(id);

            if (issueTask.getStatus() == "" || issueTask.getStatus() == null) {
                issueTask.setStatus("TO_DO");
            }

            if (issueTask.getPriority() == null) {
                issueTask.setPriority(3);
            }


            return issueTaskRepository.save(issueTask);

    }

    public Iterable<IssueTask> findBacklogById(Long id, String username){

        issueService.findByIssueId(id, username);

        return issueTaskRepository.findByIssueIdOrderByPriority(id);
    }

    public IssueTask findPTByIssueSequence(Long backlog_id, String is_id, String username){

        //make sure we are searching on an existing backlog
        issueService.findByIssueId(backlog_id, username);

        //make sure that our task exists
        IssueTask issueTask = issueTaskRepository.findByIssueSequence(is_id);

        if(issueTask==null){
            throw new IssueNotFoundException("Issue Task '"+is_id+"' not found");
        }

        if(!issueTask.getIssueId().equals(backlog_id)){
            throw new IssueNotFoundException("Issue Task `"+is_id+"' does not exist in issue: '"+backlog_id);
        }
        return issueTask;
    }

    public IssueTask updateByIssueSequence(IssueTask updatedTask, String backlog_id, String is_id, String username){
        IssueTask issueTask = findPTByIssueSequence(Long.valueOf(backlog_id), is_id, username);

        issueTask = updatedTask;

        return issueTaskRepository.save(issueTask);
    }

    public void deletePTByIssueSequence(String backlog_id, String is_id, String username){
        IssueTask issueTask = findPTByIssueSequence(Long.valueOf(backlog_id), is_id, username);
        issueTaskRepository.delete(issueTask);
    }
}
