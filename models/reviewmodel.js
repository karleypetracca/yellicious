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
            return error
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
}

module.exports = reviewModel;