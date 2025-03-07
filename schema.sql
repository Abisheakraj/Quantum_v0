-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data sources table
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'database', 'api', 'file'
    config JSONB NOT NULL,
    user_id INTEGER REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tables metadata
CREATE TABLE database_tables (
    id SERIAL PRIMARY KEY,
    data_source_id INTEGER REFERENCES data_sources(id),
    name VARCHAR(255) NOT NULL,
    schema VARCHAR(255) DEFAULT 'public',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Columns metadata
CREATE TABLE table_columns (
    id SERIAL PRIMARY KEY,
    table_id INTEGER REFERENCES database_tables(id),
    name VARCHAR(255) NOT NULL,
    data_type VARCHAR(50) NOT NULL,
    is_nullable BOOLEAN DEFAULT true,
    is_primary_key BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('demo@example.com', '$2b$10$...', 'Demo', 'User');

INSERT INTO projects (name, description, user_id) VALUES
('Sample Project', 'A demo project with sample data', 1);

INSERT INTO data_sources (name, type, config, user_id, project_id) VALUES
('Demo PostgreSQL', 'database', '{"host": "localhost", "port": 5432, "database": "demo"}', 1, 1);

INSERT INTO database_tables (data_source_id, name) VALUES
(1, 'customers');

INSERT INTO table_columns (table_id, name, data_type, is_nullable, is_primary_key) VALUES
(1, 'id', 'integer', false, true),
(1, 'name', 'varchar', false, false),
(1, 'email', 'varchar', false, false),
(1, 'created_at', 'timestamp', true, false);

