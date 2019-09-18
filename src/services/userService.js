import http from "./httpService";
import { tokenKey } from "../config.json";
const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username
  });
}

export async function updateEmailandPass(user) {
  return http.put(apiEndpoint + "/account", {
    email: user.email,
    password: user.password,
    username: user.username,
    newPass: user.newPass
  });
}

export async function getMeInfo(username) {
  return http.post(apiEndpoint + "/me", { username: username });
}

export function getUserInfo(username) {
  return http.get(apiEndpoint + "/" + username);
}

export function updateUser(user) {
  return http.put(apiEndpoint + "/me", {
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
