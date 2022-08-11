const mysql = require("mysql");

var pool = mysql.createPool({
  host: "remotemysql.com",
  user: "JTJDEblqRU",
  password: "xwnWqtZFiV",
  database: "JTJDEblqRU"
});

module.exports.pool = pool;
//login link: https://remotemysql.com/phpmyadmin/

