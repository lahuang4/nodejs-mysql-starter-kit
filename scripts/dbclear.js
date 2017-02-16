var mysql    = require('mysql');

var dbconfig = require('../config/database');

// Script for dropping the entire database
var conn = mysql.createConnection(dbconfig.connection);

conn.query('DROP DATABASE ' + dbconfig.database);

console.log('Success! Database cleared.');
conn.end();
