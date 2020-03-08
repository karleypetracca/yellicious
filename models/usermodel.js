const db = require('./conn'),
    bcrypt = require('bcryptjs');


class userModel {
    constructor (id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async addUser() {
        console.log("adding user", this);
        try {
            const response = await db.one(`
                INSERT INTO reviewer (name, email, password) VALUES ($1, $2, $3) RETURNING id
                `, [this.name, this.email, this.password]);
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    async loginUser() {
        try {
            const response = await db.one(`
                SELECT id, name, password FROM reviewer WHERE email = $1
                `, [this.email]);
            console.log('response', response);

            const isValid = this.checkPassword(response.password);

            if (!!isValid) {
                const { id, name } = response;
                return { isValid, userId: id, name };
            } else {
                console.log("not valid email/password combo", isValid);
            }
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = userModel;