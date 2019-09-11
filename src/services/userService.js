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

export async function getMeInfo(username) {
  return http.post(apiEndpoint + "/me", { username: username });
}

export function getUserInfo(username) {
  return http.get(apiEndpoint + "/" + username);
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
  return http.put(apiEndpoint + "/like", {
    userId: userId,
    recipeId: recipeId
  });
}

export function removeLike(userId, recipeId) {
  return http.put(apiEndpoint + "/unlike", {
    userId: userId,
    recipeId: recipeId
  });
}
