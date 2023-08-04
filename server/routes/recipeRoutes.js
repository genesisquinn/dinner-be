const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe')



router.post('/', async (req, res) => {
    console.log(req.body);

    try {

        const { name, instructions, ingredients, category, image } = req.body;


        const newRecipe = new Recipe({
            name,
            instructions,
            ingredients,
            category,
            image,
        });


        await newRecipe.save();

        res.status(201).json({
            message: 'Recipe added successfully',
            recipe: newRecipe
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

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json({
            success: true,
            recipe: recipe,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the recipe.' });
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