import http from "./httpService";

const apiEndpoint = "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipes(
  page = 1,
  size = 10,
  search = "",
  country = "",
  author = "",
  sort = "title-asc"
) {
  let url =
    apiEndpoint +
    `/?search=${search}&country=${country}&author=${author}&sort=${sort}&page=${page}&size=${size}`;
  return http.get(url);
}

export function getPopular(page = 1, size = 10) {
  let url = apiEndpoint + `/popular?page=${page}&size=${size}`;
  return http.get(url);
}

export function getRandom(page = 1, size = 6) {
  let url = apiEndpoint + `/random?&page=${page}&size=${size}`;
  return http.get(url);
}

export function getRecipe(recipeId) {
  console.log(recipeUrl(recipeId));
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
  return http.delete(apiEndpoint + "/" + recipeId);
}

export function getRecipesLiked(likes) {
  return http.post(apiEndpoint + "/likes", {
    likes: likes
  });
}
