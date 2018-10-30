var user = require('../models/user');

var auth = require('../utils/auth');

// Main routes for app
module.exports = function(app) {

  app.get('/', function(req, res, next) {

    res.render('index');

  });

  app.get('/profile', auth.requireLogin, function(req, res, next) {

    res.render('profile', { user: req.user });

  });

  app.get('/admin', auth.requireLogin, auth.requireAdmin, function(req, res, next) {

    user.listUsers(function(err, rows) {
      var users = [];
      if (!err) {
        rows.forEach(function(row) {
          users.push({ id: row.id, email: row.email });
        });
      }

      res.render('admin', { user: req.user, users: users });
    });

  });

  app.get('/delete/user/:id', auth.requireLogin, auth.requireAdmin, function(req, res, next) {

    if (req.user.id === req.params.id) {
      // If the user is trying to delete their own account, log them out first
      req.logout();
    }

    user.deleteUser(req.params.id, function(err) {
      if (err) {
        console.error(err);
      }
      res.redirect('/admin');
    });

  });

};
