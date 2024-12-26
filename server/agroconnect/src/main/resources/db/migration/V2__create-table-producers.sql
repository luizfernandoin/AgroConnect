CREATE TABLE producers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_type VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    description TEXT NOT NULL,
);