package com.orion.pb.services;


import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orion.pb.dto.RoleDto;
import com.orion.pb.dto.UserDto;
import com.orion.pb.dto.UserInsertDto;
import com.orion.pb.dto.UserUpdateDto;
import com.orion.pb.entities.Role;
import com.orion.pb.entities.User;
import com.orion.pb.repositories.RoleRepository;
import com.orion.pb.repositories.UserRepository;
import com.orion.pb.services.exceptions.DBException;
import com.orion.pb.services.exceptions.EntidadeNaoEncontradaException;



@Service
public class UserService implements UserDetailsService {
	
	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public Page<UserDto> findAllPaged(PageRequest pageRequest) {
		Page<User> list = repository.findAll(pageRequest);
		return UserDto.converter(list);
	}
	
	@Transactional(readOnly = true)
	public UserDto findById(Long id) {
		Optional<User> optional = repository.findById(id);
		User user = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Usuário não encontrado!"));
		return new UserDto(user);
	}
	
	@Transactional
	public UserDto insert(UserInsertDto dto) {
		User user = new User();
		copyDtoToEntity(dto, user);
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		user = repository.save(user);
		return new UserDto(user);
	}
	
	@Transactional
	public UserDto update(Long id, UserUpdateDto dto) {
		try {
			User user = repository.getOne(id);
			copyDtoToEntity(dto, user);
			user = repository.save(user);
			return new UserDto(user);
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Usuário não encontrado! " + id);
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Usuário não encontrado! " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação de DB");
		}
	}
	
	private void copyDtoToEntity(UserDto dto, User user) {
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		
		user.getRoles().clear();
		
		for (RoleDto roles : dto.getRoles()) {
			Role role = roleRepository.getOne(roles.getId());
			user.getRoles().add(role);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);
		
		if (user == null) {
			logger.error("Usuário não encontrado: " + username);
			throw new UsernameNotFoundException("Email não encontrado!");
		}
		logger.info("Usuário encontrado: " + username);
		return user;
	}
	
}