-- Active: 1682285053535@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES
("u01", "eloleo@gmail.com", "1522"),
("u02", "elathai@gmail.com", "1322"),
("u03", "elefafa@gmail.com", "2526");

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

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    created_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

INSERT INTO users
VALUES 
("u04", "Mauricio", "maumau@gmail.com", "5526"),
("u05", "Everton", "ciço@gmail.com", "3344"),
("u06", "Rodrigo", "roh@gmail.com", "4466");

INSERT INTO products
VALUES
("p02", "Tenis", "244", "Sapatos", "Masculino", "https://static.netshoes.com.br/produtos/tenis-dc-shoes-striker-masculino/28/PFI-2451-028/PFI-2451-028_zoom1.jpg?ts=1658264664"),
("p04", "Boné", "26", "Acessórios", "Masculino", "https://images.tcdn.com.br/img/img_prod/917287/bone_dc_shoes_star_x_cinza_d911a0100_2115_1_18703f907aba0d0c6556c5d19251ef92.png"),
("p01", "Chinelo", "58", "Sapatos", "Masculino", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKsVWomqOhQhzoRSpTINodCDuP5d3k7Z3XAA&usqp=CAU");

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("pr01", 488, 0, "u04"),
("pr02", 90, 0, "u05"),
("pr03", 77, 0, "u05"),
("pr04", 58, 0, "u05"),
("pr05", 150, 0, "u06"):