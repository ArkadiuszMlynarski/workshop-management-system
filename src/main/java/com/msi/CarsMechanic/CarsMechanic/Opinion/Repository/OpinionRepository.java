package com.msi.CarsMechanic.CarsMechanic.Opinion.Repository;

import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpinionRepository extends CrudRepository<Opinion, Long> {

    Iterable<Opinion> findAllByWorkshop_IdOrderByOpinionId(Long id);
    Opinion findByOpinionId(Long id);

    Iterable<Opinion> findAllByIsReported(Boolean status);
}
