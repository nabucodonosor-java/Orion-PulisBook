package com.orion.pb.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.orion.pb.entities.Casa;

public class CasaDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String imgUrl;
	@NotBlank(message = "Campo obrigatório")
	private Integer anoEntrada;
	@NotBlank(message = "Campo obrigatório")
	private Integer anoSaida;
	@NotBlank(message = "Campo obrigatório")
	private String nome;
	@NotBlank(message = "Campo obrigatório")
	private String endereco;
	private String descricao;

	public CasaDto() {
	}

	public CasaDto(Casa casa) {
		id = casa.getId();
		imgUrl = casa.getImgUrl();
		anoEntrada = casa.getAnoEntrada();
		anoSaida = casa.getAnoSaida();
		nome = casa.getNome();
		endereco = casa.getEndereco();
		descricao = casa.getDescricao();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Integer getAnoEntrada() {
		return anoEntrada;
	}

	public void setAnoEntrada(Integer anoEntrada) {
		this.anoEntrada = anoEntrada;
	}

	public Integer getAnoSaida() {
		return anoSaida;
	}

	public void setAnoSaida(Integer anoSaida) {
		this.anoSaida = anoSaida;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public static Page<CasaDto> converter(Page<Casa> casas) {
		return casas.map(CasaDto::new);
	}

}