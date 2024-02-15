const { default: slugify } = require('slugify');
const categoryModel = require('../models/categoryModel');
const slug = require('slugify');
const Category = require('../models/categoryModel');

// create category
exports.createCategoryController = async(req,res) =>{
    try {
        const {name} =req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:'Category Name is required'
            })
        }
        const existingCategory =await categoryModel.findOne({name});
        if (existingCategory){
            return res.status(409).send({
                success: false,
                message: 'Category already exists'
            });
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'Category Created Successfully',
            category
        });
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Error in category',
            error
        })
    }
}

// update category
exports.updateCategoryController = async(req,res) =>{
    try {
        const {name} =req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{
            name,slug:slugify(name)},{new:true}
            );
            res.status(200).send({
                success:true,
                message:'Category Updated Successfully',
                category
            })
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Error in updating category',
            error
        })
    }
}

// Get all categories 
exports.categoryController =async(req,res) =>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All Categories List',
            category
        })
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Error while getting all categories',
            error
        })
    }
}

// single category 
exports.singleCategoryController = async(req,res) =>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:'Get Single Category',
            category
        })

    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Error while getting single category',
            error
        })
    }
}

// delete category
exports.deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Deleted Category',
        })

    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Error while deleting category',
            error
        })
    }
}