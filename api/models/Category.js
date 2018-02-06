/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		categoryName : { type : 'string' },

  		toJSON : function(){
	  		var obj = this.toObject();
	  		delete createdAt;
	  		delete updatedAt;
	  		return obj;
	  	}
  },

  createNewCategory : function(data, callback){

  	Category.findOne({categoryName : data.name}).exec(function(err, categoryFound){
  		if(err)
  			return callback(err);
  		if(!categoryFound){
  			Category.create({ categoryName : data.name}).exec(function(err, result){
  				if(err)
  					return callback(err);

  		 		callback(null, result);
  			});
  		}
  		else{
  			return callback({ message : "Category Already Exists - Give a new Category.", status : 200 });
  		}
  	});
  	
  },

  showCategories : function(data, callback){
  	Category.find().exec(function(err, result){
  		if(err)
  			return callback(err);

  		return callback(null, result);
  	})
  },

  updateCategoryName : function(data, callback){
  	Category.update({ id : data.id}, {categoryName : data.name}).exec(function(err, updated){
  		if(err)
  			return callback(err);

  		return callback(null, updated);
  	});
  },

  deleteCategory : function(data, callback){
  	Category.destroy({ id : data.id}).exec(function(err, deleted){
  		if(err)
  			return callback(err);

  		return callback(null, deleted);
  	});
  }

};

