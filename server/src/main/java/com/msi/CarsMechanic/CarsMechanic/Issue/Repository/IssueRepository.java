package com.msi.CarsMechanic.CarsMechanic.Issue.Repository;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    Issue findByIssueId(Long id);

    Iterable<Issue> findAllByIssueLeaderOrderByIssueId(String username);
    Iterable<Issue> findAllByStatus(String status);

    Iterable<Issue> findAllByOffers_OfferedByUser(String username);

    Iterable<Issue> findAllByIssueLeaderAndIsOpinionedIsFalseAndStatusAndAcceptedOffer_OfferedByWorkshopId(String username, String status, Long workshopId);

}