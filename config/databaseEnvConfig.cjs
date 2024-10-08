const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_SEQUELIZE_DIALECT,
    "port": process.env.DB_PORT
  },
  "test": {
    "username": process.env.DB_TEST_USER,
    "password": process.env.DB_TEST_PASSWORD,
    "database": process.env.DB_TEST_NAME,
    "host": process.env.DB_TEST_HOST,
    "dialect": process.env.DB_TEST_SEQUELIZE_DIALECT,
    "port": process.env.DB_TEST_PORT
  },
  "production": {
    "username": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "host": process.env.DB_PROD_HOST,
    "dialect": process.env.DB_PROD_SEQUELIZE_DIALECT,
    "port": process.env.DB_PROD_PORT
  }
}
