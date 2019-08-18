import recipes from "../_temp_data/recipes.json";

export function getRecipes() {
  return recipes;
}

export function getRecipe(title) {
  return recipes.find(r => r._title === title);
}

export function saveRecipe(recipe) {
  let recipeInDb = recipes.find(r => r._title === recipe._title) || {};
  recipeInDb.originCountry = recipe.originCountry;
  recipeInDb.description = recipe.description;
  recipeInDb.tasteProfile = recipe.tasteProfile;
  recipeInDb.ingredient = recipe.ingredient;
  recipeInDb.instructions = recipe.instructions;
}
