import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username
  });
}

export function getSelfInfoById(id) {
  return http.get(apiEndpoint + "/me", {
    _id: id
  });
}

export function getUserInfoById(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function updateUser(user) {
  return http.put(apiEndpoint, {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.about,
    email: user.email
  });
}

export function saveLike(userId, recipeId) {
  return http.put(apiEndpoint + "/like", { _id: userId, recipeId });
}

export function removeLike(userId, recipeId) {
  return http.put(apiEndpoint + "/unlike", { _id: userId, recipeId });
}
