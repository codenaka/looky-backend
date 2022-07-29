const express = require("express");
const ingredientController = require("../controllers/ingredients");

const router = express.Router();

router
  .route("/")
  .post(ingredientController.createIngredient)
  .get(ingredientController.getAllIngredients);

module.exports = router;
