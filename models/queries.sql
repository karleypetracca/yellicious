-- restaurant
-- id	name	distance	category	favorite_dish	takeout	ate_last
-- 1    Strange Taco    30  Mexican burrito true    2019-08-02 12:30:00 +0000

-- reviewer
-- id	name	email	karma
-- 1	Zeus	trash@hotmail.com	2

-- review
-- id	reviewer_id	restaurant_id	stars	title	review
-- 1	1	1	2	my mom makes better food	they dont even have milkshakes WUT



--
---- QUERIES ----
--

-- List all restaurants.

SELECT * FROM restaurant;



-- List a single restaurant by ID.

SELECT * FROM restaurant
    WHERE id = 1;



-- List all the reviews for a given restaurant given a specific restaurant ID.

SELECT * FROM review
    WHERE review.restaurant_id = 1;



-- List all the reviews for a given restaurant, given a specific restaurant name.

SELECT * FROM review
    INNER JOIN restaurant ON review.restaurant_id = restaurant.id
    WHERE restaurant.name = 'Strange Taco';



-- List all the reviews for a given reviewer, given a specific author name.

SELECT * FROM review
    INNER JOIN reviewer ON review.reviewer_id = reviewer.id
    WHERE reviewer.name = 'Zeus';



-- List all the reviews along with the restaurant they were written for.
    -- In the query result, select the restaurant name and the review

SELECT restaurant.name as restaurant_name, review.stars, review.title, review.review FROM review
    INNER JOIN restaurant ON review.restaurant_id = restaurant.id;



-- List all the reviews along with the restaurant, and the reviewer's name.
    -- The result should have the restaurant name, the review text, and the reviewer name.
    -- Hint: you might need to do a three-way join - i.e. joining all three tables together.

SELECT restaurant.name as restaurant_name, review.stars, review.title, review.review, reviewer.name as reviewer_name FROM review
    INNER JOIN restaurant ON review.restaurant_id = restaurant.id
    INNER JOIN reviewer ON review.reviewer_id = reviewer.id;

