

module.exports = function(req, res, next) {
	sails.log(req);

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req) {
  	console.log(req);
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
