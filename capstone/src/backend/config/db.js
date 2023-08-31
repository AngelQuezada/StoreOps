const { Client } = require('pg');

const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "apple",
  database: process.env.NODE_ENV === "test" ? "capstone_test" : "capstone"
};

const db = new Client(dbConfig);
db.connect();

module.exports = db;
