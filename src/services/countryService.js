import http from "./httpService";

export function getCountries() {
  return http.get("/countries");
}
