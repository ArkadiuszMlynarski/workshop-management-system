package com.msi.CarsMechanic.CarsMechanic.Offer.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.IssueRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.Service.IssueService;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.UserNotFoundException;
import com.msi.CarsMechanic.CarsMechanic.Offer.Entity.Offer;
import com.msi.CarsMechanic.CarsMechanic.Offer.Repository.OfferRepository;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueService issueService;


    public Iterable<Offer> findAllOffers(Long id) {
        return offerRepository.findAllByIssue_IssueIdOrderByOfferId(id);
    }

    public Offer addOffer(Long id, Offer offer, String username){

        //ITs to be added to a specific issue, issue != null, BL exists
        Issue issue = issueService.findByIssueId(id, username);
        //cannot add offers, if issue has accepted offer
        if(issue.getAcceptedOffer() != null){
            throw new UserNotFoundException("Issue with ID '" + issue.getIssueId() + "' has accepted offer already.");
        }
        //set the Issue to offer
        offer.setIssue(issue);
        offer.setOfferedByUser(username);

        //pobranie nazwy workshopu i nadanie id workshopu dla offer
        Workshop workshop = workshopRepository.getById(offer.getOfferedByWorkshopId());
        offer.setWorkshop(workshop);

        return offerRepository.save(offer);
    }

    //methods for issue owner
    public void declineOfferById(Long id, String username){
        offerRepository.delete(findByOfferId(id, username));
    }

    public void acceptOfferById(Long id, String username){
        Offer offer = findByOfferId(id, username);
        Issue issue = issueRepository.findByIssueId(offer.getIssue().getIssueId());
        issue.setAcceptedOffer(offer);
        issue.setStatus("IN PROGRESS");
        issueRepository.save(issue);
    }

    public Offer findByOfferId(Long id, String username) {
        Offer offer = offerRepository.findByOfferId(id);
        if (offer == null) {
            throw new UserNotFoundException("Offer with ID '" + id + "' not found");
        }
        if(!offer.getIssue().getIssueLeader().equals(username)){
            throw new UserNotFoundException("That offer isn't from your issue");
        }
        return offer;
    }


}
