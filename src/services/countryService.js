import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://restcountries.eu/rest/v2",
  responseType: "json"
});

instance.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(JSON.stringify(error));
    toast.error(JSON.stringify(error.message));
  }

  return Promise.reject(error);
});

export default {
  get: instance.get
};
