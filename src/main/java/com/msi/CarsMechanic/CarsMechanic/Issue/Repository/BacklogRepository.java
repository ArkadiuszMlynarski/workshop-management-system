package com.msi.CarsMechanic.CarsMechanic.Issue.Repository;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
    Backlog findByTaskid(Long id);
}
