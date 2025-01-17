CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    value FLOAT NOT NULL,
    producer_id UUID NOT NULL,
    publication_date TIMESTAMP NOT NULL,

    FOREIGN KEY (producer_id) REFERENCES producers(user_id)
);
