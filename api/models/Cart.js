/**
 * Cart.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	buyerId  : { model : 'buyer' },
  	itemId   : { model : 'item' },
  	quantity : { type : 'integer' },
  	
  	toJSON : function(){
  		var obj = this.toObject();
  		delete createdAt;
  		delete updatedAt;
  		return obj;
  	}
  },

  getItemsFromCart : function(data, callback){
    Cart.find({ buyerId : data.buyerId }).populate('itemId').exec(function(err, itemsFound){
      if(err)
        return callback(err);
 
      if(itemsFound){

      	var totalPrice = 0, totalQuantity = 0;
      	var superObject = {};
      	superObject.totalInfo = [];
      	var itemsJson = [];

         _.each(itemsFound, function(itemsFound){ 
          
          	var itemObj = {
	      		   name : ""
	      	    };
          	itemObj.name = itemsFound.itemId.itemName;
          	itemObj["price"] = itemsFound.itemId.itemPrice;
          	itemsJson.push(itemObj);

          	totalPrice += itemsFound.itemId.itemPrice;
          	totalQuantity += itemsFound.quantity;
      	});     

        superObject["items"] = itemsJson;
        superObject.totalInfo.push({ Total_Cart_Quantity : totalQuantity },{ Total_Cart_Value : totalPrice });
       }
       
      return callback(null, superObject);
    });

    
  },
};

