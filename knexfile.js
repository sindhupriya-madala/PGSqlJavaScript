// Update with your config settings.
const settings = require('./settings');

const client = {
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.host,
  port : settings.port,
  ssl : settings.ssl
};

module.exports = {

  development: {
    client: 'pg',
    connection: client
  },

  migrations: {
    tableName: 'knex_migrations'
  }
};
