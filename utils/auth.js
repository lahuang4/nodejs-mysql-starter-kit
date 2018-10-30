// Route middleware to make sure a user is logged in
var requireLogin = function(req, res, next) {
	
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // If they aren't, redirect them to the login page
  res.redirect('/login');

};

// Route middleware to redirect a logged in user to their profile
var alreadyLoggedIn = function(req, res, next) {
  
  // If user is authenticated in the session, send them to their profile instead
  if (req.isAuthenticated())
    res.redirect('/profile');
  else
    return next();

};

// Route middleware to make sure a user is an admin
var requireAdmin = function(req, res, next) {

  if (req.user) {
    if (req.user.admin) {
      // If user is an admin, carry on
      return next();
    } else {
      // If they aren't, send them to their profile
      res.redirect('/profile');
    }
  } else {
    // Ask user to log in
    res.redirect('/login');
  }

};

exports.requireLogin = requireLogin;
exports.alreadyLoggedIn = alreadyLoggedIn;
exports.requireAdmin = requireAdmin;
