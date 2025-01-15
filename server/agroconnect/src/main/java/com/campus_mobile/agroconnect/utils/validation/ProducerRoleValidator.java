package com.campus_mobile.agroconnect.utils.validation;

import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.utils.validation.constraints.ProducerRole;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ProducerRoleValidator implements ConstraintValidator<ProducerRole, RegisterDTO> {

    @Override
    public boolean isValid(RegisterDTO dto, ConstraintValidatorContext context) {
        if ("PRODUCER".equalsIgnoreCase(dto.role())) {
            boolean valid = dto.productionType() != null && !dto.productionType().isBlank()
                    && dto.description() != null && !dto.description().isBlank();

            if (!valid) {
                if (dto.productionType() == null || dto.productionType().isBlank()) {
                    context.buildConstraintViolationWithTemplate("Production Type is required for PRODUCER role")
                            .addPropertyNode("productionType")
                            .addConstraintViolation();
                }
                if (dto.description() == null || dto.description().isBlank()) {
                    context.buildConstraintViolationWithTemplate("Description is required for PRODUCER role")
                            .addPropertyNode("description")
                            .addConstraintViolation();
                }

                return false;
            }
        }

        return true;
    }
}
