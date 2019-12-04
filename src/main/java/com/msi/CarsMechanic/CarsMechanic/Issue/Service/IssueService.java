package com.msi.CarsMechanic.CarsMechanic.Issue.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.IssueRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.IssueIdException;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.IssueNotFoundException;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.Role;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.RoleRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Issue saveOrUpdateIssue(Issue issue, String username){

        if(issue.getIssueId() != null){
            if(issue.getStatus().equals("IN PROGRESS") || issue.getStatus().equals("DONE")){
                throw new IssueNotFoundException("Issue can't be updated, because its already in progress");
            }
            Issue existingIssue = issueRepository.findByIssueId(issue.getIssueId());
            issue.setAcceptedOffer(existingIssue.getAcceptedOffer());  //przy edicie nie usuwa acceptedOffer

            if(existingIssue != null && (!existingIssue.getIssueLeader().equals(username))){
                throw new IssueNotFoundException("Issue not found in your account");
            } else if (existingIssue == null){
                throw new IssueNotFoundException("Issue with ID:'"+issue.getIssueId()+"' cannot be updated, because it doesnt exist");
            }
        }

        User user = userRepository.findByUsername(username);

        issue.setUser(user);
        issue.setIssueLeader(user.getUsername());
        issue.setOpinioned(false);

        //creating new issue
        if(issue.getIssueId()==null){

            issue.setStatus("TO DO");
        }


        if(issue.getDateFrom().after(issue.getDateTo())){
            throw new IssueNotFoundException("Start date is after end date");
        }
        return issueRepository.save(issue);
    }

    public void deleteIssueById(Long id, String username){
        Issue issue = findByIssueId(id, username);
        if(!issue.getIssueLeader().equals(username)){
            throw new IssueNotFoundException("Issue not found in your account");
        }
        if(issue.getStatus().equals("IN PROGRESS") || issue.getStatus().equals("DONE")){
            throw new IssueNotFoundException("Issue can't be deleted, because its already in progress");
        }
        issueRepository.delete(issue);
    }

    public Iterable<Issue> findAllIssues(String username) {
        return issueRepository.findAllByIssueLeaderOrderByIssueId(username);
    }


    public Issue findByIssueId(Long id, String username) {

        Issue issue = issueRepository.findByIssueId(id);
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName("WORKSHOPOWNER");

        if(issue == null) throw new IssueIdException("Issue with ID '"+id+"' not found");

        //Obejscie dla workshopownera na podglad issue innych uzytkownikow
        if(user.getRoles().contains(role)) return issue;

        if(!issue.getIssueLeader().equals(username)){
            throw new IssueNotFoundException("Issue not found in your account");
        }


        return issue;
    }

    public void markAsDone(Long issueId, String username){
        Issue issue = issueRepository.findByIssueId(issueId);
        if(issue==null || issue.getAcceptedOffer()==null || !issue.getAcceptedOffer().getWorkshop().getOwner().equals(username)){
            throw new IssueNotFoundException("You aren't repairing that issue");
        }
        if(issue.getStatus().equals("DONE")){
            throw new IssueNotFoundException("Issue already marked as DONE");
        }
        issue.setStatus("DONE");
        issueRepository.save(issue);
    }


    //methods for ownerController
    public Iterable<Issue> findAllIssuesForOwner(String username){
        return issueRepository.findAllByStatus("TO DO");
    }

    //zwraca wszystkie issues, ktore maja oferte zlozona przez zalogowanego workshopownera
    public Iterable<Issue> findAllIssuesOfferedByUser(String username){
        return issueRepository.findAllByOffers_OfferedByUser(username);
    }
}
