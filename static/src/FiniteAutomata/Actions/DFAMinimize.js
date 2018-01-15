import DFA from "../DFA.js";

class Pair {
    constructor(state1, state2) {
        this.states = [state1, state2];
        this.marked = false;
    }
    contains(...state) {
        let a = this.states.findIndex(item => item == state[0]);
        if (a === -1)
            return false;
        let b = this.states[1 - a] == state[1] && this.states[1 - a] !== state[0];
        return b;
    }
    mark() {
        this.marked = true;
    }
    isMarked() {
        return this.marked;
    }

    static merge(pair1, pair2) {

        let match = [];
        let hasCommon = !pair1.states.every(item =>{
            if(pair2.states.findIndex(item1 => item1 == item) !== -1) 
                return false;
            else
                return true;
        });
      
        
        if(hasCommon)
        {
            pair2.states.forEach(item =>{
                if(pair1.states.findIndex(item1 => item1 == item) == -1) 
                   pair1.states.push(item); 
            });
            return true;
        }
        else
            return false;
    }
}


export default class DFAMinimizer {
    constructor(dfa) {
        this.dfa = undefined;
        this.pair = [];
        if (arguments.length) {
            try {
                this.setDFA(dfa);
            } catch (e) {
                throw "THe constructor takes zero parameter or takes instance of a DFA class.";
            }
        }
    }

    setDFA(dfa) {
        if (!dfa || !(dfa instanceof DFA)) {
            throw "It takes an instance of DFA Class.";
        }
        this.dfa = dfa;
    }

    minimize() {
        if (this.dfa) {
            return this.myHIllAlgo();
        } else {
            throw "DFA is not set";
        }
    }
    
    myHIllAlgo() {
        this.makePair();
        this.markDistinguisable();
        this.markRemaining();
        let unmark = this.mergeEquivalentPair();
        if(unmark) {
            this.makeChanges();
            return true;
        }
        return false;
    }
    
    makePair() {
        let states = this.dfa.tuples_.state;
        this.pair = [];
        for (let i = 0; i < states.length - 1; i++) {
            for (let j = i + 1; j < states.length; j++) {
                this.pair.push(new Pair(states[i], states[j]));
            }
        }
    }

    
    markDistinguisable() {
        this.pair.forEach(pair => {
            if (this.isDistinguisable(pair)) {
                pair.mark();
            }
        });
    }

    isDistinguisable(pair) {
        let a = this.dfa.hasFinal([pair.states[0]]);
        let b = this.dfa.hasFinal([pair.states[1]]);
        return a ^ b;
    }
    markRemaining() {
        let change;
        do {
            change = false;
            this.pair.forEach(pair => {
                if (!pair.isMarked()) {
                    this.dfa.tuples_.alphabet.forEach(input => {
                        if (this.isPairTransitionMarked(pair, input)) {
                            pair.mark();
                            change = true;
                            return true;
                        }
                    });
                }
            });
        } while (change);

    }
    
    isPairTransitionMarked(pair, input) {
        let a = this.dfa.tuples_.transition[pair.states[0]][input][0];
        let b = this.dfa.tuples_.transition[pair.states[1]][input][0];
        let tpair;

        for (let i = 0; i < this.pair.length; i++) {
            if (this.pair[i].contains(a, b) ) {
                tpair = this.pair[i];
                break;
            }
        }
        if (tpair) {
            return tpair.isMarked();
        }

        return false;
    }

    mergeEquivalentPair() {
        let unmarked = [];
        this.pair.forEach(item => {
            if (!item.isMarked())
                unmarked.push(item);
        });
        if(!unmarked.length)
            return false;
        let change;
        do {
            change = false;
            for (let i = 0; i < unmarked.length - 1; i++) {
                for (let j = i+1; j < unmarked.length ; j++) {
                    if (Pair.merge(unmarked[i], unmarked[j])) {
                        unmarked.splice(j, 1);
                        change = true;
                    }
                }
            }
        } while (change)
        // console.log(unmarked);
        this.pair = unmarked;
        return true;

    }

    makeChanges() {
        let transition = this.dfa.tuples_.transition;
        let initial = this.dfa.tuples_.initial[0];
        let final = this.dfa.tuples_.final;
        let nfinal = [];
        let nstate = [];
        this.pair.forEach(item => {
            transition[item.states.join("")] = this.makeTransition(item);
        });
        this.pair.forEach(item => {
            item.states.forEach(state=> {
                delete transition[state];
            });
        });
        for(let state in transition) {
            for(let alphabet in transition[state]) {
                let transit = transition[state][alphabet][0];
                for(let state1 in transition) {
                    if(state1.includes(transit)) {
                        transition[state][alphabet] = [state1];
                        break;
                    }
                }
            }
        }
        //STATE
        for(let state in transition) { 
            nstate.push(state);
        }
        //initial
        nstate.every(item => {
            if(item.includes(initial)) {
                initial = [item];
                return false;
            }
            return true;
        });
        //fina;
        nstate.forEach(item=> {
            if(final.findIndex(final => item.includes(final) ) !==-1) {
               nfinal.push(item);
               
            }
            
        });
        
        this.makeNewTuples(nstate,initial,nfinal,transition);
        
    }

    makeTransition(pair) {
        let state = pair.states[0];
        let transition = {};
        this.dfa.tuples_.alphabet.forEach(input => {
            transition[input] =this.dfa.tuples_.transition[state][input];
        });
        return transition;
    }
    makeNewTuples(state,initial,final,transition) {
        this.dfa.tuples_.state = state;
        this.dfa.tuples_.initial = initial;
        this.dfa.tuples_.final = final;
        this.dfa.tuples_.transition = transition;
    }

}