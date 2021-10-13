import Route from '@ember/routing/route';
// import axios from "axios";
import dogNames from 'dog-names';
import { getBreeds, getRandomDogs } from '../api-funcs/api';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sortDoggos } from '../utils/utils'

export default class DoggosMainRoute extends Route {
  //anything returned from model is available to the route template as @model
  //can be an async function and use await if necc

  async model() {
    const responseBreeds = await getBreeds();
    const breeds = Object.keys(responseBreeds.data.message);
    // const dogs = []; //nested array of dog objects with { dogName, dogImage, dogBreed }
    const responseDogs = await getRandomDogs(3);
    const randomDoggosList = responseDogs.data.message;
    const dogs = sortDoggos(randomDoggosList);
    // randomDoggosList.forEach((doggoLink) => {
    //   const newDog = {};
    //   newDog.dogImage = doggoLink;

    //   //extract breed from link
    //   const indexOfClosingSlash = doggoLink.indexOf('/', 30);
    //   let breed = doggoLink.slice(30, indexOfClosingSlash);
    //   //replace any hypens with spaces
    //   const regex = /-/;
    //   breed = breed.replace(regex, ' ');
    //   //capitalise first letter
    //   breed = breed.replace(breed[0], breed[0].toUpperCase());
    //   // capitalise start of second words
    //   const indexOfSpace = breed.indexOf(' ');
    //   if (indexOfSpace > 0) {
    //     breed = breed.replace(
    //       breed[indexOfSpace + 1],
    //       breed[indexOfSpace + 1].toUpperCase()
    //     );
    //   }
    //   newDog.dogBreed = breed;
    //   newDog.dogName = dogNames.allRandom();
    //   dogs.push(newDog);
    // });
    return {
      doggos: dogs,
      breeds: breeds,
    };
  }
}
