INSERT INTO roles (name)
VALUES ('ROLE_USER')
    ON CONFLICT (name) DO NOTHING;

INSERT INTO roles (name)
VALUES ('ROLE_ADMIN')
    ON CONFLICT (name) DO NOTHING;

-- ALTER TABLE product ADD COLUMN sales_count BIGINT NOT NULL DEFAULT 0;
-- CREATE INDEX idx_product_sales_count ON product (sales_count DESC);
-- CREATE INDEX idx_product_created_at ON product (created_at DESC);