import http from "./httpService";

export function getTasteProfiles() {
  return http.get("/tasteProfiles");
}
