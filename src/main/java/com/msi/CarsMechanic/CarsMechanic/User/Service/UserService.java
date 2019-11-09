package com.msi.CarsMechanic.CarsMechanic.User.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.UserNotFoundException;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.UsernameAlreadyExistsException;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.Role;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.RoleRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    public User saveUser(User newUser) {

        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            //Make sure that password and confirmPassword match
            //We dont persist or show the confirmPassword
            newUser.setConfirmPassword("");
            System.out.println(roleRepository.findByName("USER"));
            Role role = roleRepository.findByName("USER");
            newUser.addRole(role);
            return userRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists.");
        }

    }

    public User findUserById(User updatedUser, String username) {

        //make sure we are searching on an existing backlog
//        issueService.findByIssueId(backlog_id, username);

        //make sure that our task exists

        User loggedInUser = userRepository.findByUsername(username);

        if(!updatedUser.getId().equals(loggedInUser.getId())){
            throw new UserNotFoundException("You aren't user with that ID");
        }
        if(updatedUser.getId().equals(loggedInUser.getId()) && !updatedUser.getUsername().equals((loggedInUser.getUsername()))){
            throw new UserNotFoundException("You can't change username");
        }
        return loggedInUser;
    }


    public User updateByUserId(User updatedUser, String username) {
        User user = findUserById(updatedUser, username);
        user.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
        user.setFullName(updatedUser.getFullName());


        return userRepository.save(user);
    }

    public User adminEditUserById(User updatedUser, String username) {
        User user = userRepository.getById(updatedUser.getId());
        if(updatedUser.getPassword().equals("")){
            user.setPassword(user.getPassword());
        }else user.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
        user.setFullName(updatedUser.getFullName());
        user.setUsername(updatedUser.getUsername());
        System.out.println(user.getRoles());

        return userRepository.save(user);
    }

//    public User addAdmin(User updatedUser, String username) {
//        User user = userRepository.getById(updatedUser.getId());
//        if(!user.getRoles().contains(roleRepository.findByName("ADMIN"))){
//            Role role = roleRepository.findByName("ADMIN");
//            user.addRole(role);
//        }
//
//        return userRepository.save(user);
//    }

    public User addAdmin(Long id, String username) {
        User user = userRepository.getById(id);
        if(!user.getRoles().contains(roleRepository.findByName("ADMIN"))){
            Role role = roleRepository.findByName("ADMIN");
            user.addRole(role);
        }

        return userRepository.save(user);
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }


    public Iterable<User> findAllUsers(String username){
            return userRepository.findAll();
        }

    public void deleteUserById(Long id, String username){
        userRepository.delete(findByUserId(id, username));
    }

    public User findByUserId(Long id, String username) {
        User user = userRepository.getById(id);
        if(user == null){
            throw new UserNotFoundException("User with ID '"+id+"' not found");
        }
        return user;
    }
}
