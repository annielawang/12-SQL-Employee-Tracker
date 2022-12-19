// import database driver
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: '',
      database: 'company_db'
    },
    // console.log(`Connected to the company_db database.`)
);

module.exports = db;