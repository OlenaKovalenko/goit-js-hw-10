import axios from "axios";

import { refs } from "./refs";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkupCatInfo } from "./cat-markup";

refs.loader.style.display = 'none';
refs.error.style.display = 'none';
refs.catContainer.setAttribute('hidden', '');

function showError() {
  refs.error.style.display = 'block';
}

function hiddenLoader() {
  refs.loader.style.display = 'none';
}

async function populateBreeds() {
  try {
   
    const breeds = await fetchBreeds();
    const markupOption = breeds.map(({ name, id }) => `
    <option value="${id}">${name}</option>`
    ).join('');
    refs.breedSelect.insertAdjacentHTML('afterbegin', markupOption);
  } catch (error) {
      console.error('Error fetching breeds:', error);
      showError();
  }
}

refs.breedSelect.addEventListener('change', onSelectChange);

// function onSelectChange(event) {

//   const selectedBreedId = refs.breedSelect.value;

//   // refs.loader.style.display = 'block';
//   console.log(selectedBreedId);
//   refs.catContainer.innerHTML = '';

//   fetchCatByBreed(selectedBreedId).then(catData => {
//     if (catData.length > 0) {
//       const cat = catData[0].breeds[0];

//       const markup = `
//         <img src="${catData[0].url}" alt="${cat.name}" width="500">
//         <div class="cat">
//         <h2>${cat.name}</h2>
//         <p>${cat.description}</p>
//         <p><b>Temperament: </b>${cat.temperament}</p>
//         </div>`;
      
//       refs.catContainer.innerHTML = markup;

//     }
//   })
//     .catch(error => {
//     console.log(error);
//     })
//     .finally(() => {
//       refs.loader.style.display = 'none';
//   })
// }

async function onSelectChange(event) {
  event.preventDefault();
  refs.catContainer.innerHTML = '';

  const selectedBreedId = event.currentTarget.value;

  try {
    const response = await fetchCatByBreed(selectedBreedId);
    refs.loader.style.display = 'block';
    if (response.length > 0) {
      const catData = response[0];

      const markup = createMarkupCatInfo(catData);
      refs.catContainer.removeAttribute('hidden');
      refs.catContainer.innerHTML = markup;
      
    }
    
  } catch (error) {
    console.log(error);
    showError();
    
  }
 
}


populateBreeds().then(hiddenLoader);



