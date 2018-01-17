import FATuples from './Tuples/FATuples.js';

/**
 * @summary A class that builds a structure to the Finite Automation.
 * @export
 * @abstract @class FA
 * 
 * 
 */
export default class FA {
    /**
     * Creates an instance of FA.
     * @param {FATuples} tuples 
     * @memberof FA
     */
    constructor(...tuples) {
        if (this.constructor === FA)
            throw "FA is an abstract Class";
        if(tuples.length === 0 )
            this.tuples_ = undefined;
        else if(tuples.length === 1)
            this.tuples = tuples[0];
        else
            throw "The constructor takes either 0 or 1 arg(FATuples)."

    }

    /**
     * @description - needs to be implemented if some restriction are needed.
     * 
     * @param {any} tuples 
     * @memberof FA
     */
    checkTuples(tuples) {

    }
    /**
     * 
     * @getter - tuples
     * @memberof FA
     */
    get tuples() {
        return this.tuples_;
    }

    /**
     * @setter - tuples
     * 
     * @memberof FA
     */
    set tuples(tuples) {
        if (tuples instanceof FATuples) {
            this.tuples_ = tuples;
        } else {
            throw "The FA class takes argument of type FATuples";
        }
        this.checkTuples(tuples);
    }
    /**
     * 
     * 
     * @param {any} input 
     * @returns {Boolean} - Whether the input string will be accepted or not
     * @memberof FA
     */
    check(input) {
        if (this.tuples_) {
            if (typeof input !== 'string')
                throw "Input only accepts type string";
            if (this.isValidInput(input)) {
                let states = this.ETF(input);
                if (this.hasFinal(states)) {
                    return true;
                }
                return false;

            } else
                throw "The input string seems to have symbols not in the alphabet set(E)";
        } else {
            throw "The FA has not been assigned a FATuple."
        }

    }

    /**
     * 
     * 
     * @param {any} input 
     * @returns {Boolean}
     * @memberof FA
     */
    isValidInput(input) {

        for (let i = 0; i < input.length; i++) {
            if (!this.tuples_.alphabet.find(item => item === input[i]) && input[i] !== FATuples.EPSILON)
                return false;
        }
        return true;
    }

    /**
     * @abstract 
     * 
     * @param {any} input 
     * @memberof FA
     */
    ETF(input) {
        throw "ETF is an abstract method. Needs to be implemented in Child Class"
    }
    /**
     * Checking to see if the set of passed states contain a final state
     * 
     * @param {any} states 
     * @returns 
     * @memberof FA
     */
    hasFinal(states) {
        
        return !states.every(state => {
            
            return !this.tuples_.final.find(item => {  return item === state});
        });
    }


    /**
     * Returns the transition  for give states and input
     * 
     * @param {any} states 
     * @param {any} input 
     * @returns 
     * @memberof FA
     */
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
    
    /**
     * Copying the tuples
     * 
     * @returns 
     * @memberof FA
     */
    copyTuples() {
        if(this.tuples) {
            return this.tuples.copy();
        }
        else {
            throw "FAtuples is undefined.";
        }
    }
    /**
     * Changing the tuples state name
     * 
     * @param {any} char 
     * @memberof FA
     */
    changeTupleStateName(char) {
        if(this.tuples) {
            this.tuples.changeStateName(char);
        }
        else {
            throw "FAtuples is undefined.";
        }
    }

}