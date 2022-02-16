require("dotenv").config();
module.exports = {
    jwtSecret: process.env.JWT,
    jwtSession: {
        session: false
    }
}