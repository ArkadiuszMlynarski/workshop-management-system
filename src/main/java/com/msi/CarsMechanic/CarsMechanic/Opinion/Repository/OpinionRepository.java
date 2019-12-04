package com.msi.CarsMechanic.CarsMechanic.Opinion.Repository;

import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpinionRepository extends CrudRepository<Opinion, Long> {

    Iterable<Opinion> findAllByWorkshop_IdOrderByOpinionId(Long id);
    Opinion findByOpinionId(Long id);

    Iterable<Opinion> findAllByIsReported(Boolean status);
    //for userprofile
    Iterable<Opinion> findAllByUser_Id(Long id);

    //for paging
    Page<Opinion> findByIsReportedTrueAndIsBannedFalse(Pageable pageable);
    Page<Opinion> findByIsBannedTrue(Pageable pageable);
}
