import { env } from "./config.js"
import database from "./databaseEnvConfig.cjs"
const db = database[env]

import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  define: {
    timestamps: false
  }
});
