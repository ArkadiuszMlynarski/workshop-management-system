package com.msi.CarsMechanic.CarsMechanic.User.Repository;



import com.msi.CarsMechanic.CarsMechanic.User.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Role findByName(String name);
}
