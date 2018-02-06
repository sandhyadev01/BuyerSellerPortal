/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		categoryId : { model : 'category' },
  		sellerId   : { model : 'seller' },
  		itemName   : { type  : 'string' },
  		itemPrice  : { type  : 'string' },

  		toJSON : function(){
	  		var obj = this.toObject();
	  		delete createdAt;
	  		delete updatedAt;
	  		return obj;
	  	}
  }
};

