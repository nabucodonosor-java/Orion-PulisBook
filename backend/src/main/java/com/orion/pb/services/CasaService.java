package com.orion.pb.services;


import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orion.pb.dto.CasaDto;
import com.orion.pb.entities.Casa;
import com.orion.pb.repositories.CasaRepository;
import com.orion.pb.services.exceptions.DBException;
import com.orion.pb.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class CasaService {
	
	@Autowired
	private CasaRepository repository;
	
	@Transactional(readOnly = true)
	public Page<CasaDto> findAllPaged(PageRequest pageRequest) {
		Page<Casa> page = repository.findAll(pageRequest);
		return CasaDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public CasaDto findById(Long id) {
		Optional<Casa> optional = repository.findById(id);
		Casa entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Casa não encontrada!"));
		return new CasaDto(entity);
	}
	
	@Transactional
	public CasaDto insert(CasaDto dto) {
		Casa entity = new Casa();
		copyToEntity(dto, entity);
		entity = repository.save(entity);
		return new CasaDto(entity);
	}
	
	private void copyToEntity(CasaDto dto, Casa entity) {
		entity.setImgUrl(dto.getImgUrl());
		entity.setAnoEntrada(dto.getAnoEntrada());
		entity.setAnoSaida(dto.getAnoSaida());
		entity.setNome(dto.getNome());
		entity.setEndereco(dto.getEndereco());
		entity.setDescricao(dto.getDescricao());
		
	}

	@Transactional
	public CasaDto update(Long id, CasaDto dto) {
		try {
			Casa entity = repository.getOne(id);
			copyToEntity(dto, entity);
			entity = repository.save(entity);
			return new CasaDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Casa não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Especialização não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação de integridade do DB");
		}
	}
}
