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
    minimize()  {
        let tuples = this.tuples.copy();
        this.dfaMinimize.setDFATuples(tuples);
        this.dfaMinimize.minimize();
        return tuples;
    }
}

