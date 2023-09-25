// import { fetchCatByBreed } from "./cat-api";

export function createMarkupCatInfo({url, breeds: {0: {name, description, temperament}}}) {
    return `
        <img src="${url}" alt="${name}" width="500">
        <div class="cat">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><b>Temperament: </b>${temperament}</p>
        </div>`;
}