CREATE TABLE users_reviews (
    evaluator_id UUID NOT NULL,
    evaluated_id UUID NOT NULL,
    review TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_evaluator_review FOREIGN KEY (evaluator_id) REFERENCES users(id),
    CONSTRAINT fk_evaluated_review FOREIGN KEY (evaluated_id) REFERENCES users(id)
);