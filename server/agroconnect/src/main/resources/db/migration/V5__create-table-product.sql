CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    unit_measure VARCHAR(50),
    quantity INT DEFAULT 0,
    image VARCHAR(255),
    status BOOLEAN NOT NULL DEFAULT TRUE,
    id_producer UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_producer FOREIGN KEY (id_producer) REFERENCES producers(user_id)
);