DROP DATABASE IF EXISTS bookstore;

CREATE DATABASE bookstore;

USE bookstore;

CREATE
OR
REPLACE
TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(320),
    salt VARCHAR(64),
    password VARCHAR(64),
    PRIMARY KEY (id)
);

CREATE
OR
REPLACE
TABLE categories (
    id INTEGER NOT NULL,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE
OR
REPLACE
TABLE books (
    id INT NOT NULL AUTO_INCREMENT,
    isbn VARCHAR(45) NOT NULL,
    format VARCHAR(50) NOT NULL,
    category_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50),
    summary VARCHAR(500),
    price INTEGER,
    pages INTEGER NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    contents LONGTEXT,
    publication_date DATE,
    description LONGTEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

INSERT INTO categories (id, name) VALUES (1, "동화");

INSERT INTO categories (id, name) VALUES (2, "소설");

INSERT INTO categories (id, name) VALUES (3, "사회");