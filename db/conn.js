const mysql = require('mysql2')
require('dotenv').config()

//* Conexão com database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

conn.connect(function(err) {
    if(err) {
        console.log('Erro na conexão com o MySQL:', err.message)
    }

    console.log('Conectou ao MySQL')
})

module.exports = conn