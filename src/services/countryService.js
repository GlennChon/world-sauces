import http from "./httpService";
import { apiUrl } from "../config.json";

export function getCountries() {
  return http.get(apiUrl + "/countries");
}
