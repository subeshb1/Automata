import FA from './FA.js';
import FATuples from './Tuples/FATuples.js';

export default class DFA extends FA {
    constructor(tuples) {

        super(tuples);
   
    }

    ETF(input) {

        let currentState = this.tuples_.initial[0];
        
        let transition = this.tuples_.transition;
        
        for(let i =0; i < input.length; i++) {
            currentState = transition[currentState][input[i]][0];
        }
        return [currentState];
    }
}

