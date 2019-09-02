import http from "./httpService";
import { apiUrl } from "../config.json";

export function getTasteProfiles() {
  return http.get(apiUrl + "/tasteProfiles");
}
