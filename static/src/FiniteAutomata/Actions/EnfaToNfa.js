import ENFATuples from '../Tuples/ENFATuples.js'
import NFATuples from '../Tuples/NFATuples.js'
import Conversion from './Conversion.js'

export default class EnfaToNfa extends Conversion {
    constructor(...tuples) {
        super(...tuples);
        this.push = false;
        this.join = false;
    }

    setTuples(tuples) {
        if (!tuples || !(tuples instanceof ENFATuples))
            throw "Can only take ENFATuples";
        this.tuples = tuples;
    }


    setInitialContent() {
        let states = [];
        this.tuples.state.forEach(element => {
            states.push({tname:[element]});
        });
        return states;
    }

    itemTrans(state, input) {
        return this.eClose(this.transition( this.eClose(state), input));
    }

    makeTuple(states,alphabet,initial,final,transition) {
        let nfa = new NFATuples();
        nfa.state = states;
        nfa.alphabet = alphabet;
        nfa.initial = initial;
        nfa.final = final;
        nfa.transition = transition;
        console.log(nfa);
        return nfa
    }

    get DEADCONFIG() {
        return [];
    }
   
}