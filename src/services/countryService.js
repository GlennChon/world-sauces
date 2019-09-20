import http from "./httpService";

export async function getCountries() {
  // check session storage for countries
  let countries;
  let countriesString = localStorage.getItem("countries");
  if (countriesString) {
    countries = JSON.parse(countriesString);
    return countries;
  }
  // get countries from api if none in session storage, set session storage
  countries = await http.get("/countries");
  localStorage.setItem("countries", JSON.stringify(countries));

  return countries;
}
