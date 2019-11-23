package com.msi.CarsMechanic.CarsMechanic.Workshop.Repository;


import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkshopRepository extends CrudRepository<Workshop, Long> {

    Workshop getById(Long id);
    Workshop findByName(String name);
    Iterable<Workshop> findAllByOwner(String username);
    List<Workshop> findByAddress(String address);
}
