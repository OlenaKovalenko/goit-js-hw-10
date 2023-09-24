import axios from "axios";

import { refs } from "./refs";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
// import { createMarkupCatInfo } from "./cat-markup";

const API_KEY = 'live_YTqB5AQK3y8JmuwMxWLdV8FRrbjmoQSZXIXMtHq4AaiYfbac3to6mAJHli551rkd';

axios.defaults.headers.common["x-api-key"] = API_KEY;
// refs.breedSelect.style.display = 'none';



async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);
    });
  } catch (error) {
      console.log(error);
    // console.error('Error fetching breeds:', err);
    // showError();
  }
}

refs.breedSelect.addEventListener('change', onSelectChange);

async function createMarkupCatInfo(breedId) {
    try {
        const catData = await fetchCatByBreed(breedId);
      console.log(catData);
      const cat = catData[0].breeds[0];
      console.log(cat);

    } catch (error) {
        
    }
}

function onSelectChange(event) {
 
  const breedId = refs.breedSelect.value;
  console.log(breedId);
  createMarkupCatInfo(breedId);
}

onSelectChange()

populateBreeds()



