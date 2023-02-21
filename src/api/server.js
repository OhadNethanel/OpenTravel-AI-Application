import axios from "axios";
import config from "../config/config";
const server = axios.create({
  baseURL: config.production ? config.urlProd : config.urlDev,
});

export const getSuggestions = () => {
  return new Promise((resolve, reject) => {
    server
      .get("/travel/getSuggestions")
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};

export const getCountrySuggestions = (country, searchDetails = false) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/travel/getCountrySuggestions/${country}`, searchDetails || "")
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};
export const getDetailedInformation = (location) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/travel/getDetailedInformation/${location}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};
