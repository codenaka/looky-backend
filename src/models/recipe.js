const mongoose = require("mongoose");
const Ingredient = require("../models/ingredient");

const recipeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Veuillez indiquer le nom de la recette"],
  },
  description: {
    type: String,
    required: [true, "Veuillez indiquer la preparation de la recette"],
  },
  ingredients: Array,
  imageUrl: {
    type: String,
    //required: [true, "Veuillez fournir une image pour la recette"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: [true, "Une recette doit appartenir à un utilisateur"],
  },
});

recipeSchema.pre("save", async function (next) {
  const ingredientsPromises = this.ingredients.map(
    async (id) => await Ingredient.findById(id)
  );
  this.ingredients = await Promise.all(ingredientsPromises);
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
