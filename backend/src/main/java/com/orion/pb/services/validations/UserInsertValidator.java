package com.orion.pb.services.validations;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.orion.pb.controllers.exceptions.FieldMessage;
import com.orion.pb.dto.UserInsertDto;
import com.orion.pb.entities.User;
import com.orion.pb.repositories.UserRepository;

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDto> {

	@Autowired
	private UserRepository repository;

	@Override
	public void initialize(UserInsertValid ann) {
	}

	@Override
	public boolean isValid(UserInsertDto dto, ConstraintValidatorContext context) {

		List<FieldMessage> list = new ArrayList<>();

		User user = repository.findByEmail(dto.getEmail());

		if (user != null) {
			list.add(new FieldMessage("email", "Email já existe!"));
		}

		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
