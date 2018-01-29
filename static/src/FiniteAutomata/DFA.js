import FA from './FA.js';
import FATuples from './Tuples/FATuples.js';
import DFATuples from './Tuples/DFATuples.js';
import DFAMinimizer from './Actions/DFAMinimizer.js';

export default class DFA extends FA {
    constructor(...tuples) {
        super(...tuples);
        this.dfaMinimize = new DFAMinimizer();
    }
    
    ETF(input) {

        let currentStates = this.tuples.initial;
                
        for(let i =0; i < input.length; i++) {
            currentStates = this.transition(currentStates,input[i]);
            // if(this.checkLoop(...currentStates))
            //     break;
        }
        return currentStates;
    }
    /**
     * @override
     * 
     * @param {any} tuples 
     * @memberof DFA
     */
    checkTuples(tuples) {
        if(!(tuples instanceof DFATuples))
          throw "Can only take DFA Tuples.";
    }

    checkLoop(state) {
        return !this.tuples.alphabet.every (item => {
            return this.tuples.transition[state][item] === state
        });
    }   
    minimize(mode)  {
        if (mode === undefined)
            mode = false;
            
            
        let tuples = this.tuples.copy();
        for(let i =0 ; i < tuples.state.length-1; i++) {
            let c = 0;
            for(let j = i+1; j < tuples.state.length; j++)  {
                if( (tuples.state[i].includes(tuples.state[j]) && tuples.state[i].length >= (2+tuples.state[j].length))

                || (tuples.state[j].includes(tuples.state[i]) && tuples.state[j].length >= (2+tuples.state[i].length) )) {
                   
                    c = 1;
                    tuples.changeStateName('q');
                    console.log("Ambiguous state name");
                    
                    break;
                }

            }
            if(c)
                break;
        }
        this.dfaMinimize.setDFATuples(tuples);
        this.dfaMinimize.minimize();
        if(!mode)
            tuples.changeStateName('q');
        
        return tuples;
    }
}

