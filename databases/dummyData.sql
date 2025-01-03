INSERT INTO users (email, salt, password) VALUES ("tgf@asdf.com", "123", "123");
INSERT INTO users (email, salt, password) VALUES ("@asdf.com", "123", "123");
INSERT INTO users (email, salt, password) VALUES ("tgf@asdf.com", "123", "123");
INSERT INTO users (email, salt, password) VALUES ("tgf@asdf.com", "123", "123");

INSERT INTO categories (id, name) VALUES (1, "동화");
INSERT INTO categories (id, name) VALUES (2, "소설");
INSERT INTO categories (id, name) VALUES (3, "사회");


INSERT INTO
    books (
        isbn,
        format,
        category_id,
        title,
        author,
        summary,
        price,
        pages,
        likes,
        contents,
        publication_date,
        description
    )
VALUES (
        1,
        "e-book",
        0,
        "재미있는 책",
        "김철수",
        "재미있는 내용",
        15000,
        24,
        523,
        "대충 목차라는 내용",
        "2024-12-17",
        "대충 재미있는 내용"
    );

INSERT INTO
    books (
        isbn,
        format,
        category_id,
        title,
        author,
        summary,
        price,
        pages,
        likes,
        contents,
        publication_date,
        description
    )
VALUES (
        2,
        "e-book",
        2,
        "슬픈 책",
        "이훈이",
        "슬픈 내용",
        10000,
        12,
        32,
        "대충 목차라는 내용",
        "2024-12-14",
        "대충 슬픈 내용"
    );

INSERT INTO
    books (
        isbn,
        format,
        category_id,
        title,
        author,
        summary,
        price,
        pages,
        likes,
        contents,
        publication_date,
        description
    )
VALUES (
        3,
        "종이책",
        3,
        "감동적인 책",
        "이훈이",
        "감동적인 내용",
        20000,
        54,
        44,
        "대충 목차라는 내용",
        "2024-12-12",
        "대충 감동적인 내용"
    );