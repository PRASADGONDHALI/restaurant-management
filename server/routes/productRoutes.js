const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');
const uploads = require('../middleware/multerConfig');

// routes 
// create products
router.post('/create-product',requireSignIn,isAdmin,uploads.single('photo'),productController.createProductController)
// update products
router.put('/update-product/:pid',requireSignIn,isAdmin,uploads.single('photo'),productController.updateProductController)

// get all products
router.get('/get-product',productController.getProductController)

// get single products
router.get('/get-product/:slug',productController.getSingleProductController)

// get photo 
router.get('/product-photo/:pid',productController.productPhotoController)

// delete product 
router.delete('/delete-product/:pid',requireSignIn,isAdmin,productController.deleteProductController)

// filter product
router.post('/product-filter',productController.productFilterController);

// product count 
router.get('/product-count',productController.productCountController);

// product per page
router.get('/product-list/:page',productController.productListController);

// search product
router.get('/search/:keywords',productController.searchProductController);

// similar product
router.get('/related-product/:pid/:cid',productController.relatedProductController);

// category wise product from headers
router.get('/product-category/:slug',productController.productCategoryController);

router.post('/create-payment',requireSignIn,productController.paymentController)


router.post('/add-order',requireSignIn,productController.orderController)


module.exports = router ;