import http from "./httpService";
import { apiUrl } from "../config.json";
t;
export function getTasteProfiles() {
  return http.get(apiUrl + "/tasteProfiles");
}
