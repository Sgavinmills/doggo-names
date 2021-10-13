import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getDogsByBreed } from '../api-funcs/api';
import { sortDoggos } from '../utils/utils';
import dogNames from 'dog-names';


export default class DoggosComponent extends Component {

    @tracked filtered = false;
    @tracked doggos = []; //initially hold 50 dogs (some arrays from the api can contain 1000s)
    @tracked spareDoggos = []; //hold the rest of the doggos and move 50 of a time into doggos when requested

    @action async updateGender(e) {
        //go through doogs and spare doggos array and update every name to a gender specifeid name
        console.log(e.target.value);
        this.doggos = this.doggos.map(dogObj => {
            const newDogObj = {...dogObj};
            newDogObj.dogName = e.target.value === 'boy' ? dogNames.maleRandom() : e.target.value === 'girl' ? dogNames.femaleRandom() : dogNames.allRandom();
            return newDogObj;
        })

        this.spareDoggos = this.spareDoggos.map(dogObj => {
            const newDogObj = {...dogObj}
            newDogObj.dogName = e.target.value === 'boy' ? dogNames.maleRandom() : e.target.value === 'girl' ? dogNames.femaleRandom() : dogNames.allRandom();
            return newDogObj;
        })

        console.log(this.doggos);

    }
    @action async updateFilter(e) {
        if(e.target.value === 'none') {
            this.filtered = false;
        } else {
            const responseDogs = await getDogsByBreed(e.target.value);
            this.filtered = true;
            const dogs = sortDoggos(responseDogs.data.message);
            this.doggos = dogs.splice(0, 50);
            this.spareDoggos = dogs;
        }
        

        //if choose any dogs then either change filtered back to false and it will use the initial dogs from model, or do another request with no breed?
    }

    @action loadMoreDogs() {
        const newDoggos = this.spareDoggos.splice(0, 50);
        this.doggos = [...this.doggos, ...newDoggos];
    }
}
