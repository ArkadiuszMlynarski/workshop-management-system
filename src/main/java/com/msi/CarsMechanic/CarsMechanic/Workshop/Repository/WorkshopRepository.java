package com.msi.CarsMechanic.CarsMechanic.Workshop.Repository;


import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkshopRepository extends PagingAndSortingRepository<Workshop, Long> {

    Workshop getById(Long id);
    Workshop findByName(String name);
    Iterable<Workshop> findAllByOwner(String username);
    List<Workshop> findByAddress(String address);
    Page<Workshop> findByAcceptedTrue(Pageable pageable);
    Page<Workshop> findByAcceptedFalse(Pageable pageable);
}
