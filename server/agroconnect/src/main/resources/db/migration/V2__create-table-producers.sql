CREATE TABLE producers (
    user_id UUID PRIMARY KEY,
    production_type VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);