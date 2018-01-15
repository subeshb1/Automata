import FATuples from "./FATuples.js";

export default class ENFATuples extends FATuples {
    /**
     * Creates an instance of NFATuples.
     * @description Should contain [states],[alphabet],[initial],[final],{transition} in order
     * @example
     * <pre><code>{
     * //Use '$' for epsilon
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


    
}
