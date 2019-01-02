var mysql = require('mysql');

var dbconfig = require('../config/database');

// Database setup
var pool = mysql.createPool(dbconfig.connection);
pool.getConnection(function(err, conn) {
  conn.query('USE ' + dbconfig.database, function() {
    conn.release();
  });
});

// Returns a connection to the db
var getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    callback(err, conn);
  });
};

// Helper function for querying the db; releases the db connection
// callback(err, rows)
var query = function(queryString, params, callback) {
  getConnection(function(err, conn) {
    if (err)
      return callback(err);
    conn.query(queryString, params, function(err, rows) {
      conn.release();

      if (err)
        return callback(err);

      return callback(err, rows);
    });
  });
};

// Heartbeat function to keep the connection to the database up
var keepAlive = function() {
  getConnection(function(err, conn) {
    if (err)
      return;

    conn.ping();
    conn.release();
  });
};

// Set up a keepalive heartbeat
setInterval(keepAlive, 30000);

exports.query = query;
