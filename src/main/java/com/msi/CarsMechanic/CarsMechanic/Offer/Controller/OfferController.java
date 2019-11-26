package com.msi.CarsMechanic.CarsMechanic.Offer.Controller;

import com.msi.CarsMechanic.CarsMechanic.Offer.Entity.Offer;
import com.msi.CarsMechanic.CarsMechanic.Offer.Service.OfferService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/offer")
@CrossOrigin("*")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/{issueId}")
    public Iterable<Offer> getIssueBacklog(@PathVariable Long issueId, Principal principal){
        return offerService.findAllOffers(issueId);
    }

    @PostMapping("/{issueId}")
    public ResponseEntity<?> addIssueToBacklog(@Valid @RequestBody Offer offer,
                                               BindingResult result, @PathVariable Long issueId, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Offer offer1 = offerService.addOffer(issueId, offer, principal.getName());
        return new ResponseEntity<Offer>(offer1, HttpStatus.CREATED);
    }

    @DeleteMapping("/{offerId}")
    public ResponseEntity<?> declineOffer(@PathVariable Long offerId, Principal principal) {
        offerService.declineOfferById(offerId, principal.getName());
        return new ResponseEntity<String>("Offer with ID: " + offerId + " declined.", HttpStatus.OK);
    }

    @PostMapping("/accept/{offerId}")
    public ResponseEntity<?> acceptOffer(@PathVariable Long offerId, Principal principal) {
        offerService.acceptOfferById(offerId, principal.getName());
        return new ResponseEntity<String>("Offer with ID: " + offerId + " accepted.", HttpStatus.OK);
    }
}
