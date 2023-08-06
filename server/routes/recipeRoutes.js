const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const path = require('path');
const multer = require('multer');
const { uploadFileToStorage } = require('../gcp')

const upload = multer({
    storage: multer.memoryStorage()
})


router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, instructions, ingredients, category } = req.body;

        const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

        const imageUrl = await uploadFileToStorage(req.file);

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: imageUrl,
        });

        await newRecipe.save();

        res.status(201).json({
            message: 'Recipe added successfully',
            recipe: newRecipe,
        });
    } catch (err) {
        res.status(500).json({ msg: err, error: 'An error occurred while saving the recipe.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();

        res.status(200).json({
            recipes: recipes,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while getting recipes.' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        console.log(recipeId)
        const recipe = await Recipe.findById(recipeId);
        console.log(recipe)

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.json({success:true, recipe});
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error Occurred' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedData = req.body;


        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        recipe.set(updatedData);
        await recipe.save();

        res.status(200).json({
            message: 'Recipe updated successfully',
            updatedRecipe: recipe,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the recipe.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;


        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        await Recipe.findByIdAndDelete(recipeId);

        res.status(200).json({
            message: 'Recipe deleted successfully',
            deletedRecipe: recipe,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the recipe.' });
    }
});


router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;

        const recipes = await Recipe.find({ category: category });

        res.status(200).json({
            success: true,
            recipes: recipes,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching recipes by category.' });
    }
});

module.exports = router;