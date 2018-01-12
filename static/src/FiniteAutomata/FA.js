import FATuples from './Tuples/FATuples';

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
        this.tuples_ = tuples;
    }


}

