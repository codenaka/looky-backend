const Recipe = require("../models/recipe");
const catchAsync = require("../utils/catchAsync");

exports.createRecipe = catchAsync(async (req, res) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      recipe,
    },
  });
});

exports.getAllRecipes = catchAsync(async (req, res) => {
  const recipes = await Recipe.find();

  res.status(200).json({
    status: "success",
    data: {
      recipes,
    },
  });
});
