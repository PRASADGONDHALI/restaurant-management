const express = require('express');
const router = express.Router() ;
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');


// Routes 
// Create Category
router.post('/create-category',requireSignIn,isAdmin,categoryController.createCategoryController);

// update category
router.put('/update-category/:id',requireSignIn,isAdmin,categoryController.updateCategoryController)

// get all category
router.get('/get-category',categoryController.categoryController);

// single category
router.get('/single-category/:slug',categoryController.singleCategoryController);

// delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,categoryController.deleteCategoryController);

module.exports = router;
