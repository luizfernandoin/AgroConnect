CREATE TABLE categories (
    id_product UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(255) NOT NULL,
    CONSTRAINT primary_key_categories PRIMARY KEY (id_product, category),
    CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES product(id)
);