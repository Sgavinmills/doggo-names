import axios from 'axios';

const dogsAPI = axios.create({
  baseURL: 'https://dog.ceo/api/',
});

export const getRandomDogs = async (limit) => {
  const response = await dogsAPI.get(`breeds/image/random/${limit}`);
  //response.data.message is an array of dog links in format 'https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg'
  return response;
};

export const getDogsByBreed = async (breed) => {
  const response = await dogsAPI.get(`breed/${breed}/images`);
  return response;
}

export const getBreeds = async () => {
  const response = await dogsAPI.get(`breeds/list/all`);
  //response.data.message is array of objects each object has a property of a breed and value of array of sub breeds (can be empty)
  return response;
};
