/**
 * Seller.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		sUserId : { model : 'user' },

  		toJSON : function(){
	  		var obj = this.toObject();
	  		delete createdAt;
	  		delete updatedAt;
	  		return obj;
	  	}
  },

  addItems : function(data, callback){

  	Seller.findOne({ id : data.sellerId }).exec(function(err, sellerFound){
  		if(err){
  			console.log("Seller Not Found..\n\n");
  			return callback(err);
  		}
  		
  		
  		if(sellerFound){
  	//		lCase_ItemPrice = data.price.toLowerCase();
  			
  			lCase_ItemName = data.name.toLowerCase();

  			var itemDetails = {
		  		categoryId : data.categoryId,
		  		sellerId   : data.sellerId,
		  		itemName   : lCase_ItemName,
		  		itemPrice  : data.price
		  	};
		  	console.log("Seller Found..");
  			console.log("Item Name :: ", lCase_ItemName);
  			console.log("Item Price:: ", data.price);

		  	Item.create(itemDetails).exec(function(err, itemCreated){
		  		if(err)
		  			return callback({ message : "Unable to create a new Item Listing.."});

		  		return callback(null, itemCreated);
		  	});
  		}
  		else{
  			return callback({ message : "Seller Not Found --> Please check with correct Seller ID" });
  		}

 	});

   },
};

