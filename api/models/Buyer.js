/**
 * Buyer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	bUserId : { model : 'user' },

  	toJSON : function() {
			var obj = this.toObject();
			delete createdAt;
			delete updatedAt;
			return obj;
		}
  },

  addItemsToCart : function(data, callback){

  	var cartDetails = {
  		buyerId : data.buyerId,
  		itemId  : data.itemId,
  		quantity: data.quantity
  	}

  	Cart.create(cartDetails).exec(function(err, itemAdded){
  		if(err)
  			return callback(err);

  		return callback(null, itemAdded);
  	});
  },

  
};

