const Recipe = require("../models/recipe");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/recipes");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `recipe-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Veuillez envoyer une image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadRecipeImage = upload.single("recipeImage");

exports.createRecipe = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  console.log(req.body);
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
