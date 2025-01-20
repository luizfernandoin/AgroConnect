package com.campus_mobile.agroconnect.model;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum ProductionType {
    VEGETABLES("vegetables"),
    GRAINS("grains"),
    DAIRY("dairy"),
    FRUITS("fruits"),
    MEAT("meat"),
    OTHER("other");

    private String production;

    ProductionType(String production) {
        this.production = production;
    }
}
