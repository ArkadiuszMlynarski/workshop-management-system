package com.msi.CarsMechanic.CarsMechanic.Workshop.Controller;

import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Service.UserService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.DTO.WorkshopDTO;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Repository.WorkshopRepository;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.WorkshopService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workshop")
public class WorkshopController {


    @Autowired
    private WorkshopService workshopService;
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Workshop> createNewWorkshop(@RequestBody WorkshopDTO workshopDTO){
        System.out.println(workshopDTO.getOwner());
        Workshop workshop1 = new Workshop();
        workshop1.setName(workshopDTO.getName());
        workshop1.setAddress(workshopDTO.getAddress());
        workshop1.setOwner(userService.getUserById(workshopDTO.getOwner()));
        workshopService.saveOrUpdateWorkshop(workshop1);

        return new ResponseEntity<Workshop>(workshop1, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public Iterable<Workshop> getAllWorkshops() {
        return workshopService.findAllWorkshops();
    }

    @GetMapping("/getByAddress/{address}")
    public List<Workshop> findByAddress(@PathVariable String address){
        return workshopService.getWorkshopByAddress(address);
    }

}

