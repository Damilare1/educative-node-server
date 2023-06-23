const dbConfig = require('./config').db;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  dialect: 'mariadb',
  define: {
    timestamps: false
  }
});

const db = { sequelize, Sequelize, ValidationError: Sequelize.ValidationError };
module.exports = db;