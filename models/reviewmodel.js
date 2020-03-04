const db = require('./conn');


class reviewModel {
    constructor (stars, title, review, restaurant) {
        this.stars = stars;
        this.title = title;
        this.review = review;
        this.restaurant = restaurant;
    }

    static async getAllRestaurant() {
        try {
            const response = await db.any(`
                SELECT id, name FROM restaurant;
            `);
            return response
        } catch (error) {
            console.log("ERROR: ", error);
            return error
        }
    }

    static async getOneRestaurant(id) {
        try {
            const response = await db.any(`
                SELECT * FROM restaurant
                WHERE restaurant.id = ${id};
            `);
            return response
        } catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }

    static async getOneAvgStars(id) {
        try {
            const response = await db.any(`
                SELECT AVG(review.stars) as avg_stars FROM review
                WHERE review.restaurant_id = ${id}
                GROUP BY review.restaurant_id;
            `);
            let avgStars = Math.floor(response[0].avg_stars), avgStarsString = ``;
            for (let i = 0; i <= avgStars; i++) {
                avgStarsString += `<i class="fas fa-star has-text-warning"></i>`
            };
            return avgStarsString
        } catch (error) {
            console.log("ERROR: ", error);
            return error;
        }
    }

    static async getAll() {
        try {
            const response = await db.any(`
                SELECT restaurant.name as restaurant_name, review.stars, review.title, review.review, reviewer.name as reviewer_name FROM review
                INNER JOIN restaurant ON review.restaurant_id = restaurant.id
                INNER JOIN reviewer ON review.reviewer_id = reviewer.id;
            `);
            return response
        } catch (error) {
            console.log("ERROR: ", error);
            return error
        }
    }

    static async getOne(id) {
        try {
            const response = await db.any(`
                SELECT restaurant.name as restaurant_name, review.stars, review.title, review.review, reviewer.name as reviewer_name FROM review
                INNER JOIN restaurant ON review.restaurant_id = restaurant.id
                INNER JOIN reviewer ON review.reviewer_id = reviewer.id
                WHERE restaurant.id = ${id};
            `);
            return response
        } catch (error) {
            console.log("ERROR: ", error);
            return error
        }
    }

    static async newReview(reviewer_id, restaurant_id, review_title, review_stars, review_review) {
        try {
            const response = await db.one(`
                INSERT INTO review (reviewer_id, restaurant_id, stars, title, review)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id`,
                [reviewer_id, restaurant_id, review_stars, review_title, review_review]
            );
            return response
        } catch (error) {
            console.log("ERROR: ", error);
            return error
        }
    }

}

module.exports = reviewModel;