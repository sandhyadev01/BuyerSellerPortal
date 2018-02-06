/**
 * SellerController
 *
 * @description :: Server-side logic for managing sellers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	addItems : function(req, res){
		console.log("CategoryID -->", req.body.categoryId);
		console.log("Seller ID --->", req.body.sellerId);
		if(!req.body)
			res.negotiate({ message : "Incomplete Request..!", status : 400});

		Seller.addItems(req.body, function(err, data){
			if(err)
				return res.negotiate(err);

			return res.json(data);
		});
	}

};

