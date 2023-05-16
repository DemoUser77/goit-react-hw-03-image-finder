import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35002477-fdb6a2ab2685cc152e3e088fa';


export async function fetchImages(query, page, perPage) {
  const {data} = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
  console.log(data)
    return data;
}
    