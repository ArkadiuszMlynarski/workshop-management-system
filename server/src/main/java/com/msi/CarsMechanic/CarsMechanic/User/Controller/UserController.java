package com.msi.CarsMechanic.CarsMechanic.User.Controller;


import com.msi.CarsMechanic.CarsMechanic.Payload.JWTLoginSucessResponse;
import com.msi.CarsMechanic.CarsMechanic.Payload.LoginRequest;
import com.msi.CarsMechanic.CarsMechanic.Security.JwtTokenProvider;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Service.UserService;
import com.msi.CarsMechanic.CarsMechanic.Validator.UserValidator;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static com.msi.CarsMechanic.CarsMechanic.Security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        //validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PatchMapping("/editUser")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result,
                                             Principal principal){

        userValidator.validate(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        System.out.println(user.getUsername()+" "+user.getId());
        System.out.println(principal.getName());

        User updatedUser = userService.updateByUserId(user, principal.getName());

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public User getUser(Principal principal) {
        return userService.findUserByUsername(principal.getName());
    }


}
