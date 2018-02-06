/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getItemsFromCart : function(req, res){
		sails.log('here');
		// if(!req.body)
		// 	return res.negotiate({ message : "Params Missing.." });

		Cart.getItemsFromCart(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
		
	},
};

