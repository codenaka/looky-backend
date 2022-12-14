const express = require("express");

const recipeController = require("../controllers/recipes");

const router = express.Router();

router
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(recipeController.uploadRecipeImage, recipeController.createRecipe);

module.exports = router;
