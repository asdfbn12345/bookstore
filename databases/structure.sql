DROP DATABASE IF EXISTS bookstore;

CREATE DATABASE bookstore;

USE bookstore;

CREATE OR REPLACE TABLE shipping_information (
    id INTEGER NOT NULL AUTO_INCREMENT,
    address VARCHAR(300) NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(15),
    PRIMARY KEY (id)
)

CREATE
OR
REPLACE
TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    email VARCHAR(320),
    salt VARCHAR(64),
    password VARCHAR(64),
    shipping_information_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (shipping_information_id) REFERENCES shipping_information (id)
);

CREATE OR REPLACE TABLE deliveries (
    id INTEGER NOT NULL AUTO_INCREMENT,
    order_id INTEGER NOT NULL,
    shipping_information_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (shipping_information_id) REFERENCES shipping_information (id)
)

CREATE OR REPLACE TABLE orders (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    delivery_id INTEGER NOT NULL,
    created_at DATE NOT NULL,
    total_count INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (delivery_id) REFERENCES deliveries (id)
);

ALTER TABLE deliveries ADD FOREIGN KEY order_id REFERENCES shipping_information (id);

CREATE OR REPLACE TABLE likes (
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY user_id REFERENCES users (id),
    FOREIGN KEY book_id REFERENCES books (id)
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