-- Active: 1682285053535@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES
("u01", "eloleo@email.com", "1522"),
("u02", "elathai@email.com", "1322"),
("u03", "elefafa@email.com", "2526");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES
("p01", "Chinelo", 58, "Sapatos"),
("p02", "Tenis", 244, "Sapatos"),
("p03", "Bota", 135, "Sapatos"),
("p04", "Boné", 26, "Acessórios"),
("p05", "Cinto", 12, "Acessórios");

DROP TABLE products;