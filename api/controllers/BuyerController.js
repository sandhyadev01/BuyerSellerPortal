/**
 * BuyerController
 *
 * @description :: Server-side logic for managing buyers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	addItemsToCart : function(req, res){
		if(!req.body)
			return res.negotiate({ message : "Params Missing.." });

		Buyer.addItemsToCart(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
		
	},

	
};

