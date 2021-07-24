package com.msi.CarsMechanic.CarsMechanic.Offer.Repository;

import com.msi.CarsMechanic.CarsMechanic.Offer.Entity.Offer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Long> {

    Offer findByOfferId(Long id);
    Offer findByOfferedByUserAndIssue_IssueId(String username, Long id);
    Iterable<Offer> findAllByIssue_IssueIdOrderByOfferId(Long id);


}
