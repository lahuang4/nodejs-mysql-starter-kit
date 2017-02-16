// Route middleware to make sure a user is logged in
var requireLogin = function(req, res, next) {
	
  // If user is authentication in the session, carry on
  if (req.isAuthenticated())
    return next();

  // If they aren't, redirect them to the login page
  res.redirect('/login');

};

// Route middleware to redirect a logged in user to their profile
var alreadyLoggedIn = function(req, res, next) {
  
  // If user is authentication in the session, send them to their profile instead
  if (req.isAuthenticated())
    res.redirect('/profile');
  else
    return next();

};

exports.requireLogin = requireLogin;
exports.alreadyLoggedIn = alreadyLoggedIn;