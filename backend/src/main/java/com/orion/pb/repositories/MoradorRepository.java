package com.orion.pb.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orion.pb.entities.Casa;
import com.orion.pb.entities.Morador;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long>{
	
	@Query("SELECT DISTINCT obj FROM Morador obj INNER JOIN obj.casas casa WHERE "
			+ "(COALESCE(:casas) IS NULL OR casa IN :casas) AND "
			+ "(LOWER(obj.apelidoPrincipal) LIKE LOWER(CONCAT('%',:apelidoPrincipal,'%'))) ")
	Page<Morador> find(List<Casa> casas, String apelidoPrincipal, Pageable pageable);
	
	@Query("SELECT obj FROM Morador obj JOIN FETCH obj.casas WHERE obj IN :moradores")
	List<Morador> find(List<Morador> moradores);

}
