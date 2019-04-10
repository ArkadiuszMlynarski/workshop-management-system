package com.msi.CarsMechanic.CarsMechanic.User.Repository;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {


}
