const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez indiquer le nom de l'ingredient"],
  },
  quantity: {
    type: String,
    required: [true, "Veuillez indiquer la quantite de l'ingredient"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
