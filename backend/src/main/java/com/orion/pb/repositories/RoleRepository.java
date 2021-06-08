package com.orion.pb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orion.pb.entities.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
