const host = "drona.db.elephantsql.com",
    database = "aeleffvc",
    user = "aeleffvc",
    password = "v_TcNBP5qhuLAVqLYqn8r6UD1wrxBomv";

const options = {
    host: host,
    database: database,
    user: user,
    password: password
};

const pgp = require("pg-promise")({
    query: function(e) {
        console.log("QUERY:", e.query); //
    }
});

const db = pgp(options);

module.exports = db;