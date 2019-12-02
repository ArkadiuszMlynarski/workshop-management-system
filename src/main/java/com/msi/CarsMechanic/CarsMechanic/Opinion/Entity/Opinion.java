package com.msi.CarsMechanic.CarsMechanic.Opinion.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Opinion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long opinionId;

    @Column
    @NotNull(message = "Rate is required")
    private Long rate;

    @Column
    @NotBlank(message = "Description cant be empty")
    private String description;

    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd\nHH:mm:ss")
    private LocalDateTime creationDate;

    @Column(columnDefinition = "boolean default false")
    private Boolean isReported;

    @Column(columnDefinition = "boolean default false")
    private Boolean isBanned;

    @ManyToOne
    @JoinColumn(name="workshopId", referencedColumnName="id")
    @JsonIgnore
    private Workshop workshop;

    @ManyToOne
    @JoinColumn(name="userId", referencedColumnName="id")
    private User user;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "opinionedIssueId", referencedColumnName = "issueId")
    private Issue issue;

    private Long opinionedByIssueId;

    public Opinion() {
    }

    public Long getOpinionedByIssueId() {
        return opinionedByIssueId;
    }

    public void setOpinionedByIssueId(Long opinionedByIssueId) {
        this.opinionedByIssueId = opinionedByIssueId;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getOpinionId() {
        return opinionId;
    }

    public void setOpinionId(Long opinionId) {
        this.opinionId = opinionId;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Long getRate() {
        return rate;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getReported() {
        return isReported;
    }

    public void setReported(Boolean reported) {
        isReported = reported;
    }

    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }
}
