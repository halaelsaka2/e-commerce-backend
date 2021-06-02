require("dotenv").config({ path: `../../.env` });
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    email: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    email: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    email: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  },
};
