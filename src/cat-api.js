import axios from "axios";

const API_KEY = 'live_YTqB5AQK3y8JmuwMxWLdV8FRrbjmoQSZXIXMtHq4AaiYfbac3to6mAJHli551rkd';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common["x-api-key"] = API_KEY;

// export function fetchBreeds() {
//     return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }
//         return response.json();
//     }).catch(error => console.log(error));
    
//     console.log(response);
// }


async function fetchBreeds() {
  try {
      const response = await axios.get(`${BASE_URL}/breeds?api_key=${API_KEY}`);
      
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchBreeds()