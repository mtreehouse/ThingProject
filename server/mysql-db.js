const mysql = require('mysql2')
const connection = mysql.createConnection(({
    host:'seed-springboot-webservice.cac6eisuepcp.us-east-1.rds.amazonaws.com',
    port:3306,
    user:'admin',
    password:'39273927',
    database:'mydb'
}));

module.exports = connection;