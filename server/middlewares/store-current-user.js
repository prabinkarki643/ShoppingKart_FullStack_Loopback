var app = require('../server')
var LoopBackContext = require('loopback-context');
module.exports = function() {
  return function storeCurrentUser(req, res, next) {
    if (!req.accessToken) {
      return next();
    }
    app.models.Customer.findById(req.accessToken.userId, function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('No user with this access token was found.'));
      }
      var loopbackContext = LoopBackContext.getCurrentContext();
      if (loopbackContext) {
        req.currentUser=user
        loopbackContext.set('currentUser', user);
      }
      next();
    });
  };
};
