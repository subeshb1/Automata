import ENFATuples from '../Tuples/ENFATuples.js'
import DFATuples from '../Tuples/DFATuples.js'
import Conversion from './Conversion.js'

export default class EnfaToDfa extends Conversion {
    constructor(...tuples) {
        super(...tuples);
    }

    setTuples(tuples) {
        if (!tuples || !(tuples instanceof ENFATuples))
            throw "Can only take ENFATuples";
        this.tuples = tuples;
    }


    setInitialContent() {
        return [{
            tname: this.eClose(this.tuples.initial)
        }];
    }
    itemTrans(state, input) {
        return this.eClose(this.transition(state, input));
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