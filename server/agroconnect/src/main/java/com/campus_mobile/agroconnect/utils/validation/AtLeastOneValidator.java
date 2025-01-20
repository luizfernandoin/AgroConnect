package com.campus_mobile.agroconnect.utils.validation;

import com.campus_mobile.agroconnect.utils.validation.constraints.AtLeastOne;
import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AtLeastOneValidator implements ConstraintValidator<AtLeastOne, RegisterDTO> {
    @Override
    public boolean isValid(RegisterDTO dto, ConstraintValidatorContext context) {
        boolean valid = (dto.cpf() != null && !dto.cpf().isBlank()) ||
                (dto.cnpj() != null && !dto.cnpj().isBlank());

        if (!valid) {
            if (dto.cpf() == null || dto.cpf().isBlank()) {
                context.buildConstraintViolationWithTemplate("CPF or CNPJ must be provided")
                        .addPropertyNode("cpf")
                        .addConstraintViolation();
            }
            if (dto.cnpj() == null || dto.cnpj().isBlank()) {
                context.buildConstraintViolationWithTemplate("CPF or CNPJ must be provided")
                        .addPropertyNode("cnpj")
                        .addConstraintViolation();
            }
        }

        return valid;
    }
}