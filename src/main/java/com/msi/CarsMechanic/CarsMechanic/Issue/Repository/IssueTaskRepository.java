package com.msi.CarsMechanic.CarsMechanic.Issue.Repository;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.IssueTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueTaskRepository extends CrudRepository<IssueTask, Long> {

    List<IssueTask> findByIssueIdOrderByPriority(Long id);

    IssueTask findByIssueSequence(String sequence);

}
