package com.campus_mobile.agroconnect.utils.validation.constraints;

import com.campus_mobile.agroconnect.utils.validation.AtLeastOneValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = AtLeastOneValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AtLeastOne {
    String message() default "Either CPF or CNPJ must be provided";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

