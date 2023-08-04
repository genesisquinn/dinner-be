const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    instructions: {
        type: String, 
        required: true
    },
    ingredients: {
        type: Array, 
        required: true
    },
    category: {
        type: String,
        enum: ["Italian", "Asian", "Mediterranean", "American", "Caribbean", "Salads", "Other"],
        required: true
    },
    image: {
        type: String, 
        // required: true
    },


});

module.exports = mongoose.model('Recipe', recipeSchema);