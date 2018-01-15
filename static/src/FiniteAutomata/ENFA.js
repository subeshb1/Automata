import ENFATuples from "./Tuples/ENFATuples.js";
import FA from "./FA.js";


export default class ENFA extends FA {
    constructor(tuples) {
        super(...arguments);

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

    checkTuples(tuples) {

    }

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



    transition(states, input) {
        let temp = [];

        states.forEach(state => {
            if (this.tuples.transition[state] && this.tuples.transition[state][input]) {
                this.tuples.transition[state][input].forEach(st => {
                    if (temp.findIndex(item => item === st) === -1)
                        temp.push(st);
                });
            }
        });

        return temp;
    }

}