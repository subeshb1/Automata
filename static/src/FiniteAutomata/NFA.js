import NFATuples from "./Tuples/NFATuples.js";
import FA from "./FA.js";
import DFATuples from "./Tuples/DFATuples.js";
import NfaToDfa from './Actions/NfaToDfa.js'
export default class NFA extends FA {
  constructor(...tuples) {
    super(...tuples);
    this.dfaConverter = new NfaToDfa();
  }

  ETF(input) {
    let states = this.tuples.initial;

    let strLen = input.length;
    for (let i = 0; i < strLen; i++) {

      states = this.transition(states, input[i]);
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

  toDFA() {
      this.dfaConverter.setTuples(this.tuples);
      let dfa = this.dfaConverter.convert();
      return dfa;

  }
}