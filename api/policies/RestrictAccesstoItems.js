

module.exports = function(req, res, next) {
	sails.log(req);

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req) {
  	console.log(' This is request from policies ---> ',req.user);
  	if(req.user.role === "buyer"){
  		console.log("Operation permitted");
  		return next();
  	} else {
  		return res.forbidden('You are not permitted to perform this action.');
  	}
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
