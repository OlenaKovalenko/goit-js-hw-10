import axios from "axios";
// import { refs } from "./refs";

const API_KEY = "live_YTqB5AQK3y8JmuwMxWLdV8FRrbjmoQSZXIXMtHq4AaiYfbac3to6mAJHli551rkd";
const BASE_URL = "https://api.thecatapi.com/v1";

axios.defaults.headers.common["x-api-key"] = API_KEY;

// let storedBreeds = [];

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASE_URL}/breeds`);
    console.log(response.data);
    return response.data;
      
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
    console.log(response.data);
    return response.data;
      
  } catch (error) {
    console.log(error);;
  }
}
fetchCatByBreed('abys')

