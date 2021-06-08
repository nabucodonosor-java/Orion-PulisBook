package com.orion.pb.services;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.orion.pb.dto.CasaDto;
import com.orion.pb.dto.MoradorDto;
import com.orion.pb.dto.UriDto;
import com.orion.pb.entities.Casa;
import com.orion.pb.entities.Morador;
import com.orion.pb.repositories.CasaRepository;
import com.orion.pb.repositories.MoradorRepository;
import com.orion.pb.services.exceptions.DBException;
import com.orion.pb.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class MoradorService {

	@Autowired
	private MoradorRepository repository;

	@Autowired
	private CasaRepository casaRepository;
	
	@Autowired
	private S3Service s3Service;

	@Transactional(readOnly = true)
	public Page<MoradorDto> findAllPaged(PageRequest pageRequest, Long casaId, String apelidoPrincipal) {
		List<Casa> casas = (casaId == 0) ? null : Arrays.asList(casaRepository.getOne(casaId));
		Page<Morador> page = repository.find(casas, apelidoPrincipal, pageRequest);
		repository.find(page.toList());
		return page.map(morador -> new MoradorDto(morador, morador.getCasas()));
	}

	@Transactional(readOnly = true)
	public MoradorDto findById(Long id) {
		Optional<Morador> optional = repository.findById(id);
		Morador entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Morador não encontrado!"));
		return new MoradorDto(entity, entity.getCasas());
	}

	@Transactional
	public MoradorDto insert(MoradorDto dto) {
		Morador entity = new Morador();
		copyToEntity(dto, entity);

		entity = repository.save(entity);
		return new MoradorDto(entity);
	}

	@Transactional
	public MoradorDto update(Long id, MoradorDto dto) {

		try {

			Morador entity = repository.getOne(id);
			copyToEntity(dto, entity);
			entity = repository.save(entity);
			return new MoradorDto(entity);

		} catch (EntidadeNaoEncontradaException e) {
			throw new EntidadeNaoEncontradaException("Médico não encontrado!");
		}

	}

	public void delete(Long id) {
		try {

			repository.deleteById(id);

		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Médico não encontrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação no DB");
		}
	}

	public UriDto uploadFile(MultipartFile file) {

		URL url = s3Service.uploadFile(file);

		return new UriDto(url.toString());
	}

	private void copyToEntity(MoradorDto dto, Morador entity) {
		entity.setStatus(dto.getStatus());
		entity.setImgUrl(dto.getImgUrl());
		entity.setNome(dto.getNome());
		entity.setApelidoPrincipal(dto.getApelidoPrincipal());
		entity.setAnoEntradaPulis(dto.getAnoEntradaPulis());
		entity.setAnoSaidaPulis(dto.getAnoSaidaPulis());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setCidadeNatal(dto.getCidadeNatal());
		entity.setAnoEntradaFaculdade(dto.getAnoEntradaFaculdade());
		entity.setUniversidade(dto.getUniversidade());
		entity.setCurso(dto.getCurso());
		entity.setDescricao(dto.getDescricao());

		entity.getCasas().clear();

		for (CasaDto casaDto : dto.getCasas()) {
			Casa casa = casaRepository.getOne(casaDto.getId());
			entity.getCasas().add(casa);
		}
	}
}