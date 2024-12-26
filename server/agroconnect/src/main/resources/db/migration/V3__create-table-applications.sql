CREATE TABLE applications (
    id_candidate UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_opportunity UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    CONSTRAINT fk_candidate FOREIGN KEY (id_candidate) REFERENCES users(id),
    CONSTRAINT fk_opportunity FOREIGN KEY (id_opportunity) REFERENCES opportunities(id),
);