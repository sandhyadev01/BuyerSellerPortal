/**
 * Route Mappings
 * (sails.config.routes)

 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
*/

module.exports.routes = {
  '/': {
    view: 'homepage'
  },

/*
  The System Scenario:
    --> User        -- Can be either Buyer or Seller 
    --> Buyer
    --> Seller
    --> Category    -- Category of Item on Portal
    --> Item        -- Details of Items available to buy/sell
    --> Cart        -- Items to be Added to Cart by Buyer

  USER is a generic user trying to signup or login to the portal
    -- Attributes : 'Name', 'Email', 'Password', 'Role', 'City'
    -- If a new User tries to SignUp --> the above parameters are fed in the request & passed to Backend.
              * IF Role = Buyer, the details are linked to Buyer table
              * IF Role = Seller, the details are linked to Seller table
    -- Once a new User is created, they are allowed to Login to the portal through an API-Generated-Token.

  SELLER:
    -- Seller can add the items to 'ITEM' table based on the Category

  BUYER: 
    -- Buyers are allowed to see the items from 'ITEM' table & add the required items to 'CART' table

  CATEGORY:
    -- This table only holds the Category of the Items in 'ITEM' table
    -- Attributes : 'CategoryName'

  ITEM:
    -- 'ITEM' table includes the generic list of items added by the Seller
    -- These items are available for Buyers to purchase.
    -- Attributes : 'ITEM_NAME', 'ITEM_PRICE'
  CART:
    -- Items added by the Buyer to purchase
    -- These items can be added/deleted from Cart
    -- Attributes : 'QUANTITY', ItemID(Linked to Item Table)

*/
  //Routes for User:
  'GET /user/getUserList'   : 'UserController.getUserList',
  'GET /user/getAllSellers' : 'UserController.getAllSellers',
  'GET /user/getAllBuyers'  : 'UserController.getAllBuyers',
  'POST /user/createNewUser': 'UserController.createNewUser',
  'POST /user/userLogin'    : 'UserController.userLogin',        
  'POST /user/updateUser'   : 'UserController.updateUserDetails',
  'POST /user/deleteUser'   : 'UserController.deleteUserDetails',

  //Routes for Seller:
  'POST /seller/addItems'     : 'SellerController.addItems',
  'POST /seller/updateItems'  : 'SellerController.updateItems',   // Pending.. rest all working.

  //Routes for Buyer:
  'POST /buyer/addItemsToCart' : 'BuyerController.addItemsToCart',

  //Routes for Cart:
  'POST /cart/getItemsFromCart': 'CartController.getItemsFromCart',

  //Routes for Category:
  'POST /category/createNewCategory'  : 'CategoryController.createNewCategory',
  'GET /category/showCategories'      : 'CategoryController.showCategories',
  'POST /category/updateCategoryName' : 'CategoryController.updateCategoryName',
  'POST /category/deleteCategory'     : 'CategoryController.deleteCategory'

};
