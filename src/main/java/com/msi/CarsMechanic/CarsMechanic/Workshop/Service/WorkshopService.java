package com.msi.CarsMechanic.CarsMechanic.Workshop.Service;

import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkshopService {

    @Autowired
    private WorkshopRepository workshopRepository;

    public Workshop saveOrUpdateWorkshop(Workshop workshop){
        return workshopRepository.save(workshop);
    }

    public Iterable<Workshop> findAllWorkshops(){
        return workshopRepository.findAll();
    }

    public List<Workshop> getWorkshopByAddress(String address){
       return workshopRepository.findByAddress(address);
    }

}

