const EPSILON = '$';


/**
 * 
 * 
 * @export
 * @class FATuples
 */
export default class FATuples {
    /**
     * Creates an instance of FATuples.
     * @description Should contain [states],[alphabet],[initial],[final],{transition} in order
     * @example
     * <pre><code>{
     * let varName = new FATuples (
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
     * @memberof FATuples
     */

    constructor(...tuples) {
        if (this.constructor === FATuples)
            throw "FATuples is an abstract Class";
        if (tuples.length === 5 || tuples.length === 0) {
            this.state_ = [];
            this.alphabet_ = [];
            this.initial_ = [];
            this.final_ = [];
            this.transition_ = {};
            if (tuples.length === 5) {
                try {
                    this.state = tuples[0];
                    this.alphabet = tuples[1];
                    this.initial = tuples[2];
                    this.final = tuples[3];
                    this.transition = tuples[4];
                } catch (e) {
                    throw e;
                }
            }
        } else
            throw "There must be 5 or 0 tuples";

    }

    /**
     * 
     * 
     * @readonly
     * @static
     * @memberof FATuples
     */
    static get EPSILON() {
        return EPSILON;
    }


    /**
     * @getter - state_
     * 
     * @memberof FATuples
     */
    get state() {

        let state = this.state_.slice(0);
        return state;

    }

    /**
     * @setter - state_
     * 
     * @memberof FATuples
     */
    set state(state) {
        if (state instanceof Array) {
            let isString = state.every(item => typeof item === 'string');
            if (isString)
                this.state_ = state.slice(0);
            else
                throw "The Array item must be a String in state Array";
        } else
            throw "State must be array";

    }


    /**
     * @getter - final_
     * 
     * @memberof FATuples
     */
    get final() {

        let final = this.final_.slice(0);
        return final;

    }

    /**
     * @setter - final_
     * 
     * @memberof FATuples
     */
    set final(final) {
        if (final instanceof Array) {
            let isString = final.every(item => typeof item === 'string');
            if (isString) {
                if (!final.every(item => this.state.find(state => state == item)))
                    throw "The final state set is not a subset of States";
                this.final_ = final.slice(0);
            } else
                throw "The Array item must be a String in final Array";
        } else
            throw "final must be array";

    }

    /**
     * @getter - alphabet_
     * 
     * @memberof FATuples
     */
    get alphabet() {

        let alphabet = this.alphabet_.slice(0);
        return alphabet;

    }


    /**
     * @setter - alphabet_
     * 
     * @memberof FATuples
     */
    set alphabet(alphabet) {
        if (alphabet instanceof Array) {
            let isString = alphabet.every(item => typeof item === 'string');
            if (isString)
                this.alphabet_ = alphabet.slice(0);
            else
                throw "The Array item must be a String in alphabet Array";
        } else
            throw "Albhabet must be array";

    }

    /**
     * @getter - initial
     * 
     * @memberof FATuples
     */
    get initial() {

        let initial = this.initial_.slice(0);
        return initial;

    }

    /**
     * @setter - initial
     * 
     * @memberof FATuples
     */
    set initial(initial) {
        if (initial instanceof Array) {
            if (initial.length === 1) {
                let isString = initial.every(item => typeof item === 'string');
                if (isString) {
                    if (!this.state.find(item => item === initial[0]))
                        throw "The initial state doesn't belong to set of states"
                    this.initial_ = initial.slice(0);
                } else
                    throw "The Array item must be a String";
            } else throw "The Array should contain only  one initial state";
        } else
            throw "State must be array";

    }

    /**
     * @getter - transition
     * 
     * @memberof FATuples
     */
    get transition() {
        let transition = this.copyTransition(this.transition_);

        return transition;
    }

    /**
     * @setter - transition
     * @throws {Type Error}
     * @memberof FATuples
     */
    set transition(transition) {
        if (transition instanceof Object && !(transition instanceof Array)) {
            for (let state in transition) {
                if (!(transition[state] instanceof Object))
                    throw "The state transition must me an Object";
                if (!this.state.find(item => item === state))
                    throw "Transition Defined for state not in set of States(Q)";
                for (let input in transition[state]) {
                    if (!this.alphabet.find(item => item === input) && input != FATuples.EPSILON)
                        throw "Input symbol is not in the alphabet State.";
                    if (transition[state][input] instanceof Array) {
                        transition[state][input].forEach(tstate => {
                            if (!this.state.find(item => item === tstate))
                                throw "Transition goes to a state not in set of States(Q)";
                        });
                    } else
                        throw "The transition should contain states in an Array";

                }
            }

            this.transition_ = this.copyTransition(transition);
        }
    }

    copyTransition(transition) {
        let ntransition = {};
        for (let state in transition) {
            ntransition[state] = Object.assign({}, transition[state]);
            for (let input in transition[state]) {
                ntransition[state][input] = Object.assign([], transition[state][input]);
            }
        }
        return ntransition;
    }
    /**
     * Makes a copy of the Tuples
     * 
     * @returns copy
     * @memberof FATuples
     */
    copy() {
        let tuples = Object.create(this);
        tuples.state_ = this.state;
        tuples.alphabet_ = this.alphabet;
        tuples.initial_ = this.initial;
        tuples.final_ = this.final;
        tuples.transition_ = this.transition;
        return tuples;
    }

    /**
     * @description - changes the states to the passed char
     * @example
     * {
     * if you passed 's'
     * states = ['A','B','C'] becomes
     * states = ['s0','s1','s2']
     * }
     * @memberof FATuples
     */
    changeStateName(char) {
        char = char.toLowerCase();
        let flag = false;
        let org = char;
        if (char.length !== 1 || typeof char !== 'string' || !(  (char[0] >= 'a' && char[0] <= 'z')  || char[0] == '#') )
            throw "Char must be of length 1 and in the english alphabet";
        for(let i = 0; i < this.state.length; i++) {
            if(this.state.find(item => item === char+i) !== undefined) {
                this.changeStateName('#');
                break;
            }
        }

        let states = this.state;
        let transition = this.transition;
        let initial = this.initial;
        let final = this.final;
        states.forEach((state, index) => {
            let oldState = state;
            let newState = char + index%10;
            states[index] = newState;
            transition[newState] = transition[oldState];
            
            delete transition[oldState];
            
            for (let st in transition) {
                for (let input in transition[st]) {
                    transition[st][input].forEach((s,i) => {
                        if( s === oldState)
                        transition[st][input][i] = newState;
                    })
                }
            }
            if(initial[0] === oldState)
                initial = [newState];
            final.forEach( (s,i) => {
                if( s === oldState)
                    final[i] = newState;
            });
            if(index%10 == 9) {
                char = char.toLowerCase();
                char = String.fromCharCode( (char.charCodeAt(0) - 97 + 1) % 26 + 97);
                
                if(org == char) {
                    flag = true;
                }
                if(flag)
                    char = char.toUpperCase();
            }
            
        });
        
        this.state = states;
        this.initial = initial;
        this.final = final;
        this.transition = transition;
        
    }

}