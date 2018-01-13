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
    constructor(tuples) {
        if(this.constructor === FA)
            throw "FA is an abstract Class";
        if(tuples instanceof FATuples) {
         this.tuples_ = tuples;
        } else {
            throw "The FA class takes argument of type FATuples";
        }
        
    }
    /**
     * 
     * 
     * @param {any} input 
     * @returns {Boolean} - Whether the input string will be accepted or not
     * @memberof FA
     */
    check(input) {
        if(typeof input !== 'string')
            throw "Input only accepts type string";
        if(this.isValidInput(input)) {
             let states = this.ETF(input);
            if(this.hasFinal(states) ) {
                return true;
            }
            return false;
            
        }
         else 
            throw "The input string seems to have symbols not in the alphabet set(E)";

    }

    /**
     * 
     * 
     * @param {any} input 
     * @returns {Boolean}
     * @memberof FA
     */
    isValidInput(input) {
        
        for(let i =0; i < input.length; i++) {
           if(!this.tuples_.alphabet.find(item => item === input[i]) && input[i] !== FATuples.EPSILON)
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

    hasFinal(states) {
        return !states.every(state => {
            return !this.tuples_.final.find( item=> item == state);
        });
    }

}

