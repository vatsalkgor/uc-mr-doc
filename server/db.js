const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:'sql112.epizy.com',
    user:'epiz_23055073',
    password:'Syf8FYiZ9aG',
    database:'epiz_23055073_uc'
});

module.exports = connection;