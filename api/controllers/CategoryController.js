/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	createNewCategory : function(req, res){
		if(!req.body || !req.body.name)
			res.negotiate(err);

		Category.createNewCategory(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			res.json(data);
		});
	},

	showCategories : function(req, res){
		Category.showCategories(null, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
	},

	updateCategoryName : function(req, res){
		if(!req.body || !req.body.name)
			return res.negotiate({ message : "Missing Information.." });

		Category.updateCategoryName(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		})
	},

	deleteCategory : function(req, res){
		if(!req.body || !req.body.id)
			return res.negotiate({ message : "Category to be Deleted --> ID Missing.." });

		Category.deleteCategory(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		})
	}
};

