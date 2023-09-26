import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import "/node_modules/slim-select/dist/slimselect.css";

import { refs } from "./refs";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkupCatInfo } from "./cat-markup";

refs.loader.style.display = 'block';
refs.error.style.display = 'none';
refs.catContainer.setAttribute('hidden', '');

function showError() {
  refs.error.classList.remove('visually-hidden');
  refs.error.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    const markupOption = breeds.map(({ name, id }) => `
    <option value="${id}">${name}</option>`
    ).join('');

    refs.breedSelect.insertAdjacentHTML('afterbegin', markupOption);
    refs.breedSelect.classList.remove('visually-hidden');
    new SlimSelect({
      select: '#breed-select',
    });

  } catch (error) {
      refs.breedSelect.classList.add('visually-hidden');

      Notify.failure('Error fetching cat info: ', error);
      showError();
  }
}

refs.breedSelect.addEventListener('change', onSelectChange);

function onSelectChange(event) {
  event.preventDefault();
  refs.catContainer.innerHTML = '';

  refs.loader.style.display = 'block';
  refs.breedSelect.classList.remove('visually-hidden');
  const selectedBreedId = event.currentTarget.value;

  fetchCatByBreed(selectedBreedId).then(response => {
    
    const catData = response[0];
    const markup = createMarkupCatInfo(catData);

    refs.catContainer.removeAttribute('hidden');
    refs.catContainer.innerHTML = markup;
  })
    .catch(error => {
    Notify.failure('Error fetching cat info: ', error);
    refs.breedSelect.classList.add('visually-hidden');
    showError();
  })
    .finally(() => {
      refs.loader.style.display = 'none';
    })
  
}

populateBreeds().then(hideLoader);



