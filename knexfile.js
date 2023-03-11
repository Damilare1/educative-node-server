const dbConfig = require('./config/config').db;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: dbConfig.DB_HOST,
      port : dbConfig.DB_PORT,
      user: dbConfig.DB_USER,
      password: dbConfig.DB_PASSWORD,
      database : dbConfig.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
