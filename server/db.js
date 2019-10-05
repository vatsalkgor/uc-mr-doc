const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host:'sql113.epizy.com',
//     user:'epiz_23055073',
//     password:'Syf8FYiZ9aG',
//     database:'epiz_23055073_uc'
// });

const connection = mysql.createConnection({
    host:'46.17.175.22',
    user:'u989048914_uc',
    password:'vatsalg007',
    database:'u989048914_uc'
})


module.exports = connection;