import http from "./httpService";

export async function getTasteProfiles() {
  // check session storage for tasteProfiles
  let tasteProfiles;
  let tasteProfilesString = localStorage.getItem("tasteProfiles");
  if (tasteProfilesString) {
    console.log("getting from local storage");
    tasteProfiles = JSON.parse(tasteProfilesString);
    return tasteProfiles;
  }
  // get tasteProfiles from api if none in session storage, set session storage
  tasteProfiles = await http.get("/tasteProfiles");
  localStorage.setItem("tasteProfiles", JSON.stringify(tasteProfiles));

  console.log("getting from api");

  return tasteProfiles;
}
