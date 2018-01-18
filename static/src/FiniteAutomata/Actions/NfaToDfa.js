
import NFATuples from '../Tuples/NFATuples.js'
import DFATuples from '../Tuples/DFATuples.js';
import Conversion from './Conversion.js';


export default class NfaToDfa extends Conversion{
    constructor(...tuples) {
        super(...tuples);

    }

    setTuples(tuples) {
        if(!tuples || !(tuples instanceof NFATuples))
            throw "Can only take instance of NFATuples.";
        this.tuples = tuples;
    }

   
    setInitialContent() {
        return [{
            tname: this.tuples.initial
        }];
    }
    itemTrans(state, input) {
        return this.transition(state, input);
    }

    makeTuple(states,alphabet,initial,final,transition) {
        let dfa = new DFATuples();
        dfa.state = states;
        dfa.alphabet = alphabet;
        dfa.initial = initial;
        dfa.final = final;
        dfa.transition = transition;
        return dfa
    }
  
}














