/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');

module.exports = {
  attributes: {
	  	userName     : { type : 'string' },
	  	userEmail    : { type : 'string' },
	  	userPassword : { type : 'string' },
	  	userRole     : { type : 'string' },
	  	city         : { type : 'string' },

	  	toJSON : function(){
	  		var obj = this.toObject();
	  		delete createdAt;
	  		delete updatedAt;
	  		return obj;
	  	}
  },

  	getUserList : function(data, callback){
		User.find().exec(function(err, result){
			if(err)
				return callback(err);

			return callback(null, result);
		});
  	},

  	getAllSellers : function(data, callback){
  		User.find({ userRole : 'seller' }).exec(function(err, sellerFound){
  			if(err)
  				return callback(err);

  			return callback(null, sellerFound);
  		})
  	},


  	getAllBuyers : function(data, callback){
  		User.find({ userRole : 'buyer' }).exec(function(err, buyerFound){
  			if(err)
  				return callback(err);

  			return callback(null, buyerFound);
  		})
  	},

  	createNewUser : function(data, callback){
  		
  		var plainTextPassword = data.password;
		var hash = bcrypt.hashSync(plainTextPassword, salt);
	 
		lCase_userRole = data.role.toLowerCase();

		var userDetails = {
	  		userName 		: data.name,
	  		userEmail 		: data.email,
	  		userPassword 	: hash, 		//data.password,
	  		userRole 		: lCase_userRole,
	  		city			: data.city
  		};

  		User.findOne({ userEmail : data.email }).exec(function(err, userFound){
  			if(err){
				return callback(err);
			}

			if(!userFound){
				User.create(userDetails).exec(function(err, createdUser){
					if(err)
						return callback(err);
				if(createdUser){
					
					console.log("User Created Successfully");
					console.log(createdUser);
					console.log("Now checking for User Role --> Buyer OR Seller!");
					
					var userRole_LCase = data.role.toLowerCase();
					if(userRole_LCase === 'buyer'){
						
						var buyerDetails = { bUserId : createdUser.id };

						console.log("Role Identified :: " + userRole_LCase + "..!");
						console.log("Buyer-UserID :: "+ buyerDetails.bUserId);

						Buyer.create(buyerDetails).exec(function(err, buyerCreated){
							if(err)
								return callback(err);

							return callback(null, buyerCreated);
						});
					}
					else{
						var sellerDetails = { sUserId : createdUser.id	};

						console.log("Role Identified :: " + userRole_LCase + "..!");
						console.log("Seller-UserID :: "+ sellerDetails.sUserId);

						Seller.create(sellerDetails).exec(function(err, sellerCreated){
							if(err)
								return callback(err);


							callback(null, sellerCreated);
						});
					}
				}
				else{
					callback({message : "Error in Creating User", status : 400});
				}

				});
			}
			else{
				callback({message : "User Already exists", status : 400});
			}
  		});
  	},

  	userLogin : function(data, callback){

		User.findOne({ userEmail : data.email }).exec(function(err, userFound){
  			if(err)
  				return callback(err);

  		//	 var plainTextPassword = data.password;
  			 var hash = bcrypt.hashSync(data.password, salt);

			if(userFound){
  				console.log("User Found..");
  				var passwordresult = bcrypt.compareSync(userFound.userPassword, hash);
  				
  				console.log(hash);
  				console.log(userFound.userPassword);
				console.log(passwordresult);
				
				if(passwordresult){
					return callback({ message : "Login Successful.."});
					var loginToken = jwt.sign(data.email, '!AGJ8643@bngs&32?daZ', { expiresIn : '1d'}); 
				}

				else
					return callback({ message : "Credentials Mismatch", status : 500 });
  			}	
			
  		});	
  	},

  	updateUserDetails : function(data, callback){
		User.update({id : data.id}, data).exec(function(err, userUpdated){
				if(err)
					return callback(err);
				
				return callback(null,userUpdated);
			});
	},

	deleteUserDetails : function(data, callback)
	{
		console.log('data.id --->',data.id);
		User.destroy({id : data.id}).exec(function(err, result){
				if(err)
					return callback(err);

				return callback(null,result);
			});
	},

};

