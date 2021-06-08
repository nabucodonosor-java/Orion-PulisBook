package com.orion.pb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orion.pb.entities.Casa;

@Repository
public interface CasaRepository extends JpaRepository<Casa, Long> {

}
