package com.msi.CarsMechanic.CarsMechanic.Offer.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offerId;

    @Column
    @NotNull(message = "Price is required")
    private Long price;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Europe/Belgrade")
    @NotNull(message = "Prefered date is required")
    private Date preferedDate;

    @Column
    @NotNull(message = "Estimated time is required")
    private Long estTime;

    @ManyToOne
    @JoinColumn(name="issueId")
    @JsonIgnore
    private Issue issue;

    @ManyToOne
    @JoinColumn(name="workshopId", referencedColumnName="id")
    private Workshop workshop;

    private String offeredByUser;

    @NotNull(message = "Workshop id is required")
    private Long offeredByWorkshopId;

    @OneToOne(mappedBy = "acceptedOffer")
    @JsonIgnore
    private Issue acceptedOffer;


    public Offer() {
    }

    public Issue getAcceptedOffer() {
        return acceptedOffer;
    }

    public void setAcceptedOffer(Issue acceptedOffer) {
        this.acceptedOffer = acceptedOffer;
    }

    public Workshop getWorkshop() {
        return workshop;
    }

    public void setWorkshop(Workshop workshop) {
        this.workshop = workshop;
    }

    public Long getOfferedByWorkshopId() {
        return offeredByWorkshopId;
    }

    public void setOfferedByWorkshopId(Long offeredByWorkshopId) {
        this.offeredByWorkshopId = offeredByWorkshopId;
    }

    public String getOfferedByUser() {
        return offeredByUser;
    }

    public void setOfferedByUser(String offeredByUser) {
        this.offeredByUser = offeredByUser;
    }

    public Long getOfferId() {
        return offerId;
    }

    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Date getPreferedDate() {
        return preferedDate;
    }

    public void setPreferedDate(Date preferedDate) {
        this.preferedDate = preferedDate;
    }

    public Long getEstTime() {
        return estTime;
    }

    public void setEstTime(Long estTime) {
        this.estTime = estTime;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }
}
