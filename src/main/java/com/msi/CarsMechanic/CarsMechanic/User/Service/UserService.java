package com.msi.CarsMechanic.CarsMechanic.User.Service;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User userSaveOrUpdateUser(User user){
        return userRepository.save(user);
    }

    public User getUserById(Long id){
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            return optionalUser.get();
        }
        else{
            return null;
        }
    }
}
