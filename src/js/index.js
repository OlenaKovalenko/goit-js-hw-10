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
      console.error('Error fetching breeds:', error);
    // showError();
  }
}

refs.breedSelect.addEventListener('change', onSelectChange);



function onSelectChange(event) {

  const selectedBreedId = refs.breedSelect.value;

  // refs.loader.style.display = 'block';
  console.log(selectedBreedId);
  refs.catContainer.innerHTML = '';

  fetchCatByBreed(selectedBreedId).then(catData => {
    if (catData.length > 0) {
      const cat = catData[0].breeds[0];

      const markup = `
        <img src="${catData[0].url}" alt="${cat.name}" width="500">
        <div class="cat">
        <h2>${cat.name}</h2>
        <p>${cat.description}</p>
        <p><b>Temperament: </b>${cat.temperament}</p>
        </div>`;
      
      refs.catContainer.innerHTML = markup;

    }
  })
    .catch(error => {
    console.log(error);
    })
    .finally(() => {
      refs.loader.style.display = 'none';
  })
}



populateBreeds();



