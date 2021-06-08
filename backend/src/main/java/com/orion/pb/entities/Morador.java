package com.orion.pb.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_morador")
public class Morador implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String status;
	@Column(columnDefinition = "TEXT")
	private String imgUrl;
	private String nome;
	private String apelidoPrincipal;
	private String anoEntradaPulis;
	private String anoSaidaPulis;
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant dataNascimento;
	private String cidadeNatal;
	private String anoEntradaFaculdade;
	private String universidade;
	private String curso;
	@Column(columnDefinition = "TEXT")
	private String descricao;

	@ManyToMany
	@JoinTable(name = "tb_morador_casa", joinColumns = @JoinColumn(name = "morador_id"), inverseJoinColumns = @JoinColumn(name = "casa_id"))
	private Set<Casa> casas = new HashSet<>();

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

	public Set<Casa> getCasas() {
		return casas;
	}

	public String getApelidoPrincipal() {
		return apelidoPrincipal;
	}

	public void setApelidoPrincipal(String apelidoPrincipal) {
		this.apelidoPrincipal = apelidoPrincipal;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Morador other = (Morador) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}