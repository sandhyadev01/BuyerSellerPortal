var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);


module.exports = {
	passwordHash : function(password, cb) {
		bcrypt.hash(password, 10, function(err, hash) {
		  if(err)
		  	return cb(err);

		   cb(null, hash);
		});
	},

	passwordCompare : function(dataPassword, userDetails, cb){
		bcrypt.compare(dataPassword, userDetails, function(err, res) {
		    if(err)
		    	return cb(err);

		    return cb(null, res);
		});
	},
}