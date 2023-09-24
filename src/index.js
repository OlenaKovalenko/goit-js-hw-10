import axios from "axios";
import { fetchBreeds } from "./cat-api";

const API_KEY = 'live_YTqB5AQK3y8JmuwMxWLdV8FRrbjmoQSZXIXMtHq4AaiYfbac3to6mAJHli551rkd';

axios.defaults.headers.common["x-api-key"] = API_KEY;


const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    container: document.querySelector('.cat-info'),
};

// fetchBreeds()

