import { db } from "./config.js"

import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
  host: db.DB_HOST,
  port: db.DB_PORT,
  dialect: 'mariadb',
  define: {
    timestamps: false
  }
});
