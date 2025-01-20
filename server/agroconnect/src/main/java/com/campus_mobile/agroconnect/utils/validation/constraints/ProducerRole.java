package com.campus_mobile.agroconnect.utils.validation.constraints;

import com.campus_mobile.agroconnect.utils.validation.ProducerRoleValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ProducerRoleValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ProducerRole {
    String message() default "Production Type and Description are required for PRODUCER role";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}