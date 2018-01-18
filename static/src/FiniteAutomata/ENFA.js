import ENFATuples from "./Tuples/ENFATuples.js";
import FA from "./FA.js";
import EnfaToDfa from "./Actions/EnfaToDfa.js";
import EnfaToNfa from "./Actions/EnfaToNfa.js";
import NFATuples from "./Tuples/NFATuples.js";
import DFATuples from "./Tuples/DFATuples.js";




export default class ENFA extends FA {
    constructor(tuples) {
        super(...arguments);
        this.dfaConverter = new EnfaToDfa();
        this.nfaConverter = new EnfaToNfa();
    }

    ETF(input) {
        let currentStates = this.tuples.initial;
        currentStates = this.eClose(currentStates);
        for (let i = 0; i < input.length; i++) {
            currentStates = this.transition(currentStates, input[i]);
            currentStates = this.eClose(currentStates);
        }

        return currentStates;

    }
    /**
     * Left empty because ENFA doesnt require checking
     * 
     * 
     * @param {any} tuples 
     * @memberof ENFA
     */
    checkTuples(tuples) {

    }
    /**
     * Defining ETransition for ENFA
     * 
     * @param {any} states 
     * @returns 
     * @memberof ENFA
     */
    eClose(states) {
        let temp = [];

        temp.push(...states);
        let length;
        do {
            length = temp.length;

            temp.forEach(state => {
                if (this.tuples.transition[state] && this.tuples.transition[state][ENFATuples.EPSILON]) {
                    this.tuples.transition[state][ENFATuples.EPSILON].forEach(item => {
                        if (temp.findIndex(st => st === item) === -1)
                            temp.push(item);
                    });
                }
            });
        } while (length !== temp.length);
        return temp;
    }

    toDfa(mode) {
        if (mode === undefined)
            mode = false;
        if (this.tuples instanceof DFATuples)
            return this.tuples.copy();
        this.dfaConverter.setTuples(this.tuples);
        let dfa = this.dfaConverter.convert();
        if (!mode)
            dfa.changeStateName('q');
        return dfa;
    }
    
    toNfa(mode) {
        if (mode === undefined)
            mode = false;
        if (this.tuples instanceof DFATuples || this.tuples instanceof NFATuples)
            return this.tuples.copy();
        this.nfaConverter.setTuples(this.tuples);
        let nfa = this.nfaConverter.convert();
        if (!mode)
            nfa.changeStateName('q');
        return nfa;
    }


}