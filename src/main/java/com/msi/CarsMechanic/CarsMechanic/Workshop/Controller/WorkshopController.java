package com.msi.CarsMechanic.CarsMechanic.Workshop.Controller;

import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Service.UserService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Repository.WorkshopRepository;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.WorkshopService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/workshop")
public class WorkshopController {


    @Autowired
    private WorkshopService workshopService;
    @Autowired
    private UserService userService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("/add")
    public ResponseEntity<?> createNewIssue(@Valid @RequestBody Workshop workshop, BindingResult result, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        workshop.setCreationDate(LocalDateTime.now());
        Workshop workshop1 = workshopService.saveOrUpdateWorkshop(workshop, principal.getName());
        return new ResponseEntity<Workshop>(workshop, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public Iterable<Workshop> getAllWorkshops(Principal principal) {
        return workshopService.findAllWorkshopsByOwner(principal.getName());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> getWorkshopById(@PathVariable Long id, Principal principal){
        Workshop workshop = workshopService.findByWorkshopId(id, principal.getName());
        return new ResponseEntity<>(workshop, HttpStatus.OK);
    }



//    @DeleteMapping("/deleteById/{id}")
//    public ResponseEntity<?> deleteWorkshopById(@PathVariable Long id){
//        workshopService.deleteWorkshopById(id);
//        return new ResponseEntity<String>("Workshop with ID: "+id+" deleted.",HttpStatus.OK);
//    }
}

