import dogNames from 'dog-names';

//Used to take an array of dog links and create array of dog objects with dogName, dogImage, dogLink.
export const sortDoggos = (dogLinks, gender) => {
    const dogs = [];
    dogLinks.forEach((doggoLink) => {
        const newDog = {};
        newDog.dogImage = doggoLink;
  
        //extract breed from link
        const indexOfClosingSlash = doggoLink.indexOf('/', 30);
        let breed = doggoLink.slice(30, indexOfClosingSlash);
        //replace any hypens with spaces
        const regex = /-/;
        breed = breed.replace(regex, ' ');
        //capitalise first letter
        breed = breed.replace(breed[0], breed[0].toUpperCase());
        // capitalise start of second words
        const indexOfSpace = breed.indexOf(' ');
        if (indexOfSpace > 0) {
          breed = breed.replace(
            breed[indexOfSpace + 1],
            breed[indexOfSpace + 1].toUpperCase()
          );
        }
        newDog.dogBreed = breed;
        newDog.dogName = gender === 'girl' ? dogNames.femaleRandom() : 'boy' ? dogNames.maleRandom() : dogNames.allRandom();
        dogs.push(newDog);
      });

      return dogs;
}