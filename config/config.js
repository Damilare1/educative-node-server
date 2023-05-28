require('dotenv').config();

const dbConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT
}

const config = {}

config.db = dbConfig;
config.jwt_secret = process.env.JWT_SECRET;
config.session_secret = process.env.SESSION_SECRET;

module.exports = config;