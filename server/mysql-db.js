const mysql = require('mysql2')
const connection = mysql.createConnection(({
    host:'thinglove.cg8vmfewbbuv.ap-northeast-2.rds.amazonaws.com',
    port:3306,
    user:'admin',
    password:'39273927',
    database:'mydb'
}));

module.exports = connection;