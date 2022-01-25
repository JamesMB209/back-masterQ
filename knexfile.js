require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
