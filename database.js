var mysql = require('mysql');


require('dotenv').config();

//database credentials import from .env file
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

// Connection ith database
var db=mysql.createConnection({
    host:DB_HOST, 
    user:DB_USER, 
    password:DB_PASSWORD, 
    database:DB_DATABASE, 
    port: DB_PORT
  });
  



module.exports = { db: db };