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

  /**
   * COnverts the NFATuples to DFATuples 
   * 
   * @returns DFATuples
   * @memberof NFA
   */
  toDFA(mode) {
      if(mode === undefined)
        mode = false;
      if(this.tuples instanceof DFATuples)
        return this.tuples.copy();
      this.dfaConverter.setTuples(this.tuples);
      let dfa = this.dfaConverter.convert();
      if(!mode)
        dfa.changeStateName('q');
      return dfa;

  }
}