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

        let currentState = this.tuples.initial[0];
        
        let transition = this.tuples.transition;
        
        for(let i =0; i < input.length; i++) {
            currentState = transition[currentState][input[i]][0];
        }
        return [currentState];
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

