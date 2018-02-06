/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
//const saltRounds = 10;
//var salt = bcrypt.genSaltSync(saltRounds);
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

  		UtilityService.passwordHash(plainTextPassword, function(err, hashedPassword){
  			if(err)
  				return callback(err);

			lCase_userRole = data.role.toLowerCase();

			var userDetails = {
		  		userName 		: data.name,
		  		userEmail 		: data.email,
		  		userPassword 	: hashedPassword, 		//data.password,
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
  		});
  	},

  	userLogin : function(data, callback){

		User.findOne({ userEmail : data.email }).exec(function(err, userFound){
  			if(err)
  				return callback(err);

			if(userFound){

				console.log(data.password);
				console.log(userFound.userPassword);
  				UtilityService.passwordCompare(data.password, userFound.userPassword, function(err, res){
  					if(err)
  						return callback(err);

  					if(res) {
  						console.log("Login Successful");

						var loginToken = jwt.sign({data : userFound.id, role : userFound.userRole}, sails.config.globals.jwtSecret, { expiresIn : '1 day' }); 
						userFound["token"] = loginToken;
  						sails.log(userFound);
						return callback(null, userFound);
  					} else {
  						console.log("Credentials Mismatch");
  						return callback({ message : "Credentials Mismatch", status : 500 });
  					}
  				});
  			} else {
  				return callback(null, {message : "Have you signed up yet !"});
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

