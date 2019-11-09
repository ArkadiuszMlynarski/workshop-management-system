package com.msi.CarsMechanic.CarsMechanic.Issue.Repository;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

    Issue findByIssueId(Long id);

    Iterable<Issue> findAllByIssueLeader(String username);
}