import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipes(
  search = "",
  country = "",
  author = "",
  sort = "title-asc"
) {
  let url =
    apiEndpoint +
    `/?search=${search}&country=${country}&author=${author}&sort=${sort}`;
  return http.get(url);
}

export function getRecipe(recipeId) {
  return http.get(recipeUrl(recipeId));
}

export function saveRecipe(recipe) {
  if (recipe._id) {
    const body = { ...recipe };
    delete body._id;
    return http.put(recipeUrl(recipe._id), body);
  }

  return http.post(apiEndpoint, recipe);
}

export function deleteRecipe(recipeId) {
  return http.delete(recipeUrl(recipeId));
}
