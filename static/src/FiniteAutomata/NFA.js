import NFATuples from "./Tuples/NFATuples.js";
import FA from "./FA.js";
import DFATuples from "./Tuples/DFATuples.js";

export default class NFA extends FA {
  constructor(...tuples) {
    super(...tuples);
  }

  ETF(input) {
    let states = this.tuples.initial;

    let strLen = input.length;
    for (let i = 0; i < strLen; i++) {

      states = this.transition(states,input[i]);
    }
    return states;
  }

  checkTuples(tuples) {
    if (!(tuples instanceof NFATuples || tuples instanceof DFATuples))
      throw "Can only take NFA or DFA Tuples.";
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