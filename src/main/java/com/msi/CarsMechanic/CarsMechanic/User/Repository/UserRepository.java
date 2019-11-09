package com.msi.CarsMechanic.CarsMechanic.User.Repository;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
    Iterable<User> findAll();
    Optional<User> findUserByUsername(String username);
    Optional<User> getUserById(Long id);


}
