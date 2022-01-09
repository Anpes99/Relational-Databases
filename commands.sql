CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes int DEFAULT 0);
 insert into blogs (author, url, title) VALUES ('anpes99', 'anpes99.com', 'anpes99Blog');
insert into blogs (author, url, title) VALUES ('anpes', 'anpes.com', 'anpesBlog');