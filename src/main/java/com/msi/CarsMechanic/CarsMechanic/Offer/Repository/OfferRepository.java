package com.msi.CarsMechanic.CarsMechanic.Offer.Repository;

import com.msi.CarsMechanic.CarsMechanic.Offer.Entity.Offer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Long> {

    Offer findByOfferId(Long id);
    Offer findByOfferedByUser(String username);
    Iterable<Offer> findAllByIssue_IssueIdOrderByOfferId(Long id);

}
