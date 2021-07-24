package com.msi.CarsMechanic.CarsMechanic.Opinion.Controller;

import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Repository.OpinionRepository;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Service.OpinionService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/opinion")
@CrossOrigin
public class OpinionController {

    @Autowired
    OpinionRepository opinionRepository;

    @Autowired
    OpinionService opinionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("/getAll/{id}")
    public Iterable<Opinion> getAllOpinionsByWorkshopId(@PathVariable Long id, Principal principal){
        return opinionRepository.findAllByWorkshop_IdOrderByOpinionId(id);
    }

    @PostMapping("/add/{workshopId}")
    public ResponseEntity<?> addOpinionToWorkshop(@Valid @RequestBody Opinion opinion,
                                               BindingResult result, @PathVariable Long workshopId, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Opinion opinion1 = opinionService.addOpinion(workshopId, opinion, principal.getName());
        return new ResponseEntity<Opinion>(opinion1, HttpStatus.CREATED);
    }
}
