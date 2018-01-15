import NFATuples from "./Tuples/NFATuples.js";
import FA from "./FA.js";
import DFATuples from "./Tuples/DFATuples.js";

export default class NFA extends FA {
  constructor(...tuples) {
    super(...tuples);
  }

  ETF(input) {
    let states = this.tuples_.initial;


    /**
     * transition - A function to make the transition among set of transitions.
     *
     * @param {input} symbol - a symbol belonging to the alphabet set
     *
     * @return {Array} Array with set of state and with prototype transition.
     */

    states.transition = symbol => {
      //A temp to store states
      let temp = [];
      //Transitioning each state
      states.forEach(state => {
        let statesTemp;
        try {
          statesTemp = this.tuples_.transition[state][symbol];
        } catch (e) {
          return;
        }
        if (statesTemp) {
          statesTemp.forEach((item) => {
            temp.push(item);
          });
        }

      });
      temp.transition = states.transition;
      return temp;
    };




    let strLen = input.length;
    for (let i = 0; i < strLen; i++) {

      states = states.transition(input[i]);
    }
    return states;
  }

  checkTuples(tuples) {
    if (!(tuples instanceof NFATuples || tuples instanceof DFATuples))
      throw "Can only take NFA or DFA Tuples.";
  }
  

}