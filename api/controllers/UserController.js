/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getUserList : function(req, res){
		User.getUserList(null, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
	},
	
	getAllSellers : function(req, res){
		User.getAllSellers(null, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		})
	},

	getAllBuyers : function(req, res){
		User.getAllBuyers(null, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		})
	},

	createNewUser : function(req, res){
		if(!req.body)
			res.negotiate({ message : "Incomplete Request or Necessary Parameters Missing from Request..!", status : 400});

		User.createNewUser(req.body, function(err, data){
	  		if(err)
	  			return res.negotiate(err);

	  		res.json(data);
	  	});
	},

	userLogin : function(req, res){
		console.log(req.body);
		if(!req.body || !req.body.email || !req.body.password)
			res.negotiate({ message : "UserID or Password Missing..", status : 400});

		User.userLogin(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
	},

	updateUserDetails : function(req, res) {
		console.log(req.body + '\n');
		 if(!req.body)
		 	return res.negotiate({message : "Incomplete Request.. ", status : 400});

		User.updateUserDetails(req.body, function(err, data)
			{
				if(err)
					return res.negotiate(err);

				return res.json(data);
			});
	},

	deleteUserDetails : function(req, res){
		console.log(req.body + '\n');

		User.deleteUserDetails(req.body, function(err, data)
			{
				if(err)
					return res.negotiate(err);

				return res.json(data);
			});
	}
};

