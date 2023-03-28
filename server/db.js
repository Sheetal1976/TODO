const mysql=require('mysql2');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nakul@2001',
    database:'todotaskmanager'
})

module.exports= connection;