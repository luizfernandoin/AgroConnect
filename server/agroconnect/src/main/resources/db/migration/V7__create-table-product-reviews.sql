CREATE TABLE product_reviews (
    id_product UUID NOT NULL,
    id_user UUID NOT NULL,
    review TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_review FOREIGN KEY (id_product) REFERENCES product(id),
    CONSTRAINT fk_user_review FOREIGN KEY (id_user) REFERENCES users(id)
);