package com.msi.CarsMechanic.CarsMechanic.Issue.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.Offer.Entity.Offer;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
public class Issue {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, unique = true)
    private Long issueId;

    @Column
    @NotBlank(message = "Title cant be empty")
    private String title;

    @Column
    @NotBlank(message = "Type cant be empty")
    private String type;

    @Column(columnDefinition = "varchar(255) default 'TO DO'", nullable = false)
    private String status;

    @Column
    @NotBlank(message = "Description cant be empty")
    private String description;

    @Column
    @NotBlank(message = "Car model cant be empty")
    private String carModel;

    @Column
    @NotBlank(message = "Localization cant be empty")
    private String localization;

    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd\nHH:mm:ss")
    private LocalDateTime creationDate;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Europe/Belgrade")
    private Date dateFrom;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Europe/Belgrade")
    private Date dateTo;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "issue")
    @JsonIgnore
    private Backlog backlog;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    private String issueLeader;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER, mappedBy = "issue", orphanRemoval = true)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Offer> offers = new ArrayList<>();

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "acceptedOfferId", referencedColumnName = "offerId")
    private Offer acceptedOffer;

    @OneToOne(mappedBy = "issue")
    @JsonIgnore
    private Opinion opinion;

    @Column(columnDefinition = "boolean default false")
    @JsonIgnore
    private Boolean isOpinioned;

    public Issue() {
    }

    public Boolean getOpinioned() {
        return isOpinioned;
    }

    public void setOpinioned(Boolean opinioned) {
        isOpinioned = opinioned;
    }

    public Opinion getOpinion() {
        return opinion;
    }

    public void setOpinion(Opinion opinion) {
        this.opinion = opinion;
    }

    public Offer getAcceptedOffer() {
        return acceptedOffer;
    }

    public void setAcceptedOffer(Offer acceptedOffer) {
        this.acceptedOffer = acceptedOffer;
    }

    public List<Offer> getOffers() {
        return offers;
    }

    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }

    public Long getIssueId() {
        return issueId;
    }

    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getLocalization() {
        return localization;
    }

    public void setLocalization(String localization) {
        this.localization = localization;
    }


    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Backlog getBacklog() {
        return backlog;
    }

    public void setBacklog(Backlog backlog) {
        this.backlog = backlog;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIssueLeader() {
        return issueLeader;
    }

    public void setIssueLeader(String issueLeader) {
        this.issueLeader = issueLeader;
    }
}
