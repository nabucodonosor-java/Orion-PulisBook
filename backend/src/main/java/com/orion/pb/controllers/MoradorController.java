package com.orion.pb.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.orion.pb.dto.MoradorDto;
import com.orion.pb.dto.UriDto;
import com.orion.pb.services.MoradorService;

@RestController
@RequestMapping("/moradores")
public class MoradorController {

	@Autowired
	private MoradorService service;

	@GetMapping
	public ResponseEntity<Page<MoradorDto>> findAll(
			@RequestParam(value = "casaId", defaultValue = "0") Long casaId,
			@RequestParam(value = "apelidoPrincipal", defaultValue = "") String apelidoPrincipal,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "apelidoPrincipal") String orderBy) {
				
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<MoradorDto> list = service.findAllPaged(pageRequest, casaId, apelidoPrincipal.trim());
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<MoradorDto> findById(@PathVariable Long id) {
		MoradorDto entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping
	public ResponseEntity<MoradorDto> insert(@Valid @RequestBody MoradorDto dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PostMapping("/image")
	public ResponseEntity<UriDto> uploadFile(@RequestParam("file") MultipartFile file) {
		UriDto dto = service.uploadFile(file);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<MoradorDto> update(@PathVariable Long id, @Valid @RequestBody MoradorDto dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}