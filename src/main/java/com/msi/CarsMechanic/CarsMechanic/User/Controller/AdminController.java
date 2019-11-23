package com.msi.CarsMechanic.CarsMechanic.User.Controller;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Service.UserService;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private WorkshopService workshopService;


    // USERS

    @GetMapping("/getUsers")
    public  Iterable<User> getAllUsers(@RequestParam(defaultValue = "0") Integer pageNo,
                                       @RequestParam(defaultValue = "5") Integer pageSize,
                                       @RequestParam(defaultValue = "id") String sortBy,
                                       Principal principal){
        return userService.findAllUsers(pageNo, pageSize, sortBy, principal.getName());
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id, Principal principal){
        userService.deleteUserById(id, principal.getName());
        return new ResponseEntity<String>("User with ID: "+id+" deleted.", HttpStatus.OK);
    }

    @GetMapping("/findUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id, Principal principal){
        User user = userService.findByUserId(id, principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/AdminEditUser")
    public ResponseEntity<?> AdminEditUser(@Valid @RequestBody User user, BindingResult result,
                                           Principal principal){
        User updatedUser = userService.adminEditUserById(user, principal.getName());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PatchMapping("/addAdmin/{id}")
    public ResponseEntity<?> addAdmin(@PathVariable Long id, Principal principal){
        User updatedUser = userService.addAdmin(id, principal.getName());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


    // WORKSHOPS

    @GetMapping("/getWorkshops")
    public Iterable<Workshop> getAllWorkshops(Principal principal) {
        return workshopService.findAllWorkshops(principal.getName());
    }

    @PatchMapping("/acceptWorkshop/{id}")
    public ResponseEntity<?> acceptWorkshop(@PathVariable Long id, Principal principal){
        Workshop updatedWorkshop = workshopService.acceptWorkshop(id, principal.getName());
        return new ResponseEntity<>(updatedWorkshop, HttpStatus.OK);
    }

    @DeleteMapping("/deleteWorkshopById/{id}")
    public ResponseEntity<?> deleteWorkshopById(@PathVariable Long id, Principal principal) {
        workshopService.deleteWorkshopById(id, principal.getName());
        return new ResponseEntity<String>("Workshop with ID: " + id + " deleted.", HttpStatus.OK);
    }
}
