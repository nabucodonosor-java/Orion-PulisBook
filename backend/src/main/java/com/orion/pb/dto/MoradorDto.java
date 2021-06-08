package com.orion.pb.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.orion.pb.entities.Casa;
import com.orion.pb.entities.Morador;

public class MoradorDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String status;
	private String imgUrl;
	@NotBlank(message = "Campo obrigatório")
	private String nome;
	@NotBlank(message = "Campo obrigatório")
	private String apelidoPrincipal;
	private String anoEntradaPulis;
	private String anoSaidaPulis;
	private Instant dataNascimento;
	private String cidadeNatal;
	private String anoEntradaFaculdade;
	private String universidade;
	private String curso;
	private String descricao;

	private Set<CasaDto> casas = new HashSet<>();

	public MoradorDto() {
	}

	public MoradorDto(Morador morador) {
		id = morador.getId();
		status = morador.getStatus();
		imgUrl = morador.getImgUrl();
		nome = morador.getNome();
		apelidoPrincipal = morador.getApelidoPrincipal();
		anoEntradaPulis = morador.getAnoEntradaPulis();
		anoSaidaPulis = morador.getAnoSaidaPulis();
		dataNascimento = morador.getDataNascimento();
		cidadeNatal = morador.getCidadeNatal();
		anoEntradaFaculdade = morador.getAnoEntradaFaculdade();
		universidade = morador.getUniversidade();
		curso = morador.getCurso();
		descricao = morador.getDescricao();
	}

	public MoradorDto(Morador morador, Set<Casa> casas) {
		this(morador);
		casas.forEach(c -> this.casas.add(new CasaDto(c)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getApelidoPrincipal() {
		return apelidoPrincipal;
	}

	public void setApelidoPrincipal(String apelidoPrincipal) {
		this.apelidoPrincipal = apelidoPrincipal;
	}

	public String getAnoEntradaPulis() {
		return anoEntradaPulis;
	}

	public void setAnoEntradaPulis(String anoEntradaPulis) {
		this.anoEntradaPulis = anoEntradaPulis;
	}

	public String getAnoSaidaPulis() {
		return anoSaidaPulis;
	}

	public void setAnoSaidaPulis(String anoSaidaPulis) {
		this.anoSaidaPulis = anoSaidaPulis;
	}

	public Instant getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Instant dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getCidadeNatal() {
		return cidadeNatal;
	}

	public void setCidadeNatal(String cidadeNatal) {
		this.cidadeNatal = cidadeNatal;
	}

	public String getAnoEntradaFaculdade() {
		return anoEntradaFaculdade;
	}

	public void setAnoEntradaFaculdade(String anoEntradaFaculdade) {
		this.anoEntradaFaculdade = anoEntradaFaculdade;
	}

	public String getUniversidade() {
		return universidade;
	}

	public void setUniversidade(String universidade) {
		this.universidade = universidade;
	}

	public String getCurso() {
		return curso;
	}

	public void setCurso(String curso) {
		this.curso = curso;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Set<CasaDto> getCasas() {
		return casas;
	}

	public static Page<MoradorDto> converter(Page<Morador> moradores) {
		return moradores.map(MoradorDto::new);
	}
}