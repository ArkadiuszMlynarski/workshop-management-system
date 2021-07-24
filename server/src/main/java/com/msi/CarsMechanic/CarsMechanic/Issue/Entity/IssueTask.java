//package com.msi.CarsMechanic.CarsMechanic.Issue.Entity;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import java.util.Date;
//
//@Entity
//public class IssueTask {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(updatable = false, unique = true)
//    private String issueSequence;
//    @NotBlank(message = "Please include a issue summary")
//    private String summary;
//    private String acceptanceCriteria;
//    private String status;
//    private Integer priority;
//    @JsonFormat(pattern = "yyyy-mm-dd")
//    private Date dueDate;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="backlog_id", updatable = false, nullable = false)
//    @JsonIgnore
//    private Backlog backlog;
//
//    @Column(updatable = false)
//    private Long issueId;
//    private Date create_At;
//    private Date updated_At;
//
//    public IssueTask() {
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getIssueSequence() {
//        return issueSequence;
//    }
//
//    public void setIssueSequence(String issueSequence) {
//        this.issueSequence = issueSequence;
//    }
//
//    public String getSummary() {
//        return summary;
//    }
//
//    public void setSummary(String summary) {
//        this.summary = summary;
//    }
//
//    public String getAcceptanceCriteria() {
//        return acceptanceCriteria;
//    }
//
//    public void setAcceptanceCriteria(String acceptanceCriteria) {
//        this.acceptanceCriteria = acceptanceCriteria;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public Integer getPriority() {
//        return priority;
//    }
//
//    public void setPriority(Integer priority) {
//        this.priority = priority;
//    }
//
//    public Date getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(Date dueDate) {
//        this.dueDate = dueDate;
//    }
//
//    public Long getIssueId() {
//        return issueId;
//    }
//
//    public void setIssueId(Long issueId) {
//        this.issueId = issueId;
//    }
//
//    public Date getCreate_At() {
//        return create_At;
//    }
//
//    public void setCreate_At(Date create_At) {
//        this.create_At = create_At;
//    }
//
//    public Date getUpdated_At() {
//        return updated_At;
//    }
//
//    public void setUpdated_At(Date updated_At) {
//        this.updated_At = updated_At;
//    }
//
//    @PrePersist
//    protected void onCreate(){
//        this.create_At = new Date();
//    }
//
//    @PreUpdate
//    protected void onUpdate(){
//        this.updated_At = new Date();
//    }
//
//    @Override
//    public String toString() {
//        return "IssueTask{" +
//                "id=" + id +
//                ", issueSequence='" + issueSequence + '\'' +
//                ", summary='" + summary + '\'' +
//                ", acceptanceCriteria='" + acceptanceCriteria + '\'' +
//                ", status='" + status + '\'' +
//                ", priority=" + priority +
//                ", dueDate=" + dueDate +
//                ", issueId=" + issueId +
//                ", create_At=" + create_At +
//                ", updated_At=" + updated_At +
//                '}';
//    }
//
//    public Backlog getBacklog() {
//        return backlog;
//    }
//
//    public void setBacklog(Backlog backlog) {
//        this.backlog = backlog;
//    }
//}
