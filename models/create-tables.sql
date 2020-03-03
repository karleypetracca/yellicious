CREATE TABLE restaurant (
    id serial PRIMARY KEY,
    name text NOT NULL,
    distance integer,
    category text,
    favorite_dish text,
    takeout boolean,
    ate_last timestamp
);

CREATE TABLE reviewer (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email varchar,
    karma int CHECK (karma <= 7)
);

CREATE TABLE review (
    id serial PRIMARY KEY,
    reviewer_id int,
    restaurant_id int,
    stars int CHECK (stars <= 5) NOT NULL,
    title text,
    review text,
    FOREIGN KEY (reviewer_id) REFERENCES reviewer (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
);

INSERT INTO restaurant (name, distance, category, favorite_dish, takeout, ate_last)
    VALUES ('Strange Taco', 30, 'Mexican', 'burrito', TRUE, '2019-08-02 12:30:00');
    
INSERT INTO reviewer (name, email, karma)
    VALUES ('Zeus', 'trash@hotmail.com', 2);

INSERT INTO review (reviewer_id, restaurant_id, stars, title, review)
    VALUES (1, 1, 2, 'my mom makes better food', 'they dont even have milkshakes WUT');