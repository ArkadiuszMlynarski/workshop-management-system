package com.msi.CarsMechanic.CarsMechanic.Offer.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="issueId")
    @JsonIgnore
    private Issue issue;

    private String offeredByUser;

    @NotBlank(message = "Workshop is required")
    private String offeredByWorkshop;
    private Long offeredByWorkshopId;



    public Offer() {
    }

    public Long getOfferedByWorkshopId() {
        return offeredByWorkshopId;
    }

    public void setOfferedByWorkshopId(Long offeredByWorkshopId) {
        this.offeredByWorkshopId = offeredByWorkshopId;
    }

    public String getOfferedByWorkshop() {
        return offeredByWorkshop;
    }

    public void setOfferedByWorkshop(String offeredByWorkshop) {
        this.offeredByWorkshop = offeredByWorkshop;
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
