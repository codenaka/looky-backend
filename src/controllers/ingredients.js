const Ingredient = require("../models/ingredient");
const catchAsync = require("../utils/catchAsync");

exports.createIngredient = catchAsync(async (req, res) => {
  const ingredient = await Ingredient.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ingredient,
    },
  });
});

exports.getAllIngredients = catchAsync(async (req, res) => {
  const ingredients = await Ingredient.find();

  res.status(200).json({
    status: "success",
    data: {
      ingredients,
    },
  });
});
