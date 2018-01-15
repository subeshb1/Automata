import FATuples from "./FATuples.js";

export default class NFATuples extends FATuples {
    /**
     * Creates an instance of NFATuples.
     * @description Should contain [states],[alphabet],[initial],[final],{transition} in order
     * @example
     * <pre><code>{
     * let varName = new NFATuples (
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
     * @memberof NFATuples
     */

    constructor(...tuples) {
        super(...tuples);   
        
    }


    set transition(transition) {
        super.transition = transition;        
        
        for (let state in transition) {
            let count = 0;
            for(let alphabet in transition[state]) {
                if(alphabet === NFATuples.EPSILON)
                    throw "NFA can't contain Epsilion transition";
            }
            
        }
        
    }

    get transition() {
        return super.transition;
    }
}
