import FATuples from "./FATuples.js";



export default class DFATuples extends FATuples {
    /**
     * Creates an instance of DFATuples.
     * @description Should contain [states],[alphabet],[initial],[final],{transition} in order
     * @example
     * <pre><code>{
     * let varName = new DFATuples (
     *  ['q0','q1'], //set of States (Q)
     *  ['a','b'], //set of input Albhabets (E)
     *  ['q0'], //initial states (q0)
     *  ['q1'], //Final State (F)
     *  {
     *   q0: {
     *     a: ['q0'],
     *     b: ['q1'] 
     *    },
     *    q1: {
     *      a: ['q0'],
     *      b: ['q1'] 
     *    }
     *  } //transition
     * );
     * }</code></pre>
     * @param1 {Array} state
     * @param2 {Array} alphabet
     * @param3 {Array} initial
     * @param4 {Array} final
     * @param5 {Object} transition
     * @throws {Error}
     * @memberof DFATuples
     */

    constructor(...tuples) {
        super(...tuples);   
        
    }

    set transition(transition) {
        super.transition = transition;
        let countState = 0;
       
        for (let state in transition)    {
            countState++;
            let countAlphabet = 0;
            for(let input in transition[state]) {
                countAlphabet++;
                if( transition[state][input].length !== 1) {
                    throw "Only one transition can be defined for an input.";
                }
            }
            if(countAlphabet !== this.alphabet.length) {
               
                
                throw "Transition for every input is not defined.";
            }

            
        }
        if(countState !== this.state.length)
            throw "Transition for every state is not defined.";
    }
    get transition() {
        return super.transition;
        
    }

}