var auth = require('../utils/auth');

// Main routes for app
module.exports = function(app) {

  app.get('/', function(req, res, next) {

    res.render('index');

  });

  app.get('/profile', auth.requireLogin, function(req, res, next) {

    res.render('profile', { user: req.user });

  });

};
