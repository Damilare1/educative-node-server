import { db } from "./config/config.js";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      host: db.DB_HOST,
      port : db.DB_PORT,
      user: db.DB_USER,
      password: db.DB_PASSWORD,
      database : db.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
