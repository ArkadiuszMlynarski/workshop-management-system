package com.msi.CarsMechanic.CarsMechanic.Issue.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name= "backlog")
@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskid;
    private Integer PTSequence = 0;
    private Long issue_id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "issue", nullable = false)
    @JsonIgnore
    private Issue issue;

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "backlog", orphanRemoval = true)
    private List<IssueTask> issueTasks = new ArrayList<>();

    public Backlog(){

    }

    public Long getTaskid() {
        return taskid;
    }

    public void setTaskid(Long taskid) {
        this.taskid = taskid;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public Long getIssue_id() {
        return issue_id;
    }

    public void setIssue_id(Long issue_id) {
        this.issue_id = issue_id;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public List<IssueTask> getIssueTasks() {
        return issueTasks;
    }

    public void setIssueTasks(List<IssueTask> issueTasks) {
        this.issueTasks = issueTasks;
    }
}
