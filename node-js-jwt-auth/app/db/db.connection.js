// in case we have to manually connect to the database
var mysql = require('mysql2')
var config = require('../config/db.config')

var con = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected.')
})