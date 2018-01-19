import ENFATuples from '../Tuples/ENFATuples.js'
import DFATuples from '../Tuples/DFATuples.js'
import NFATuples from '../Tuples/NFATuples.js'




/**
 * Base Class for all the conversion in Finite Automata
 * 
 * @export
 * @class Conversion
 */
export default class Conversion {
    constructor(...tuples) {
        if (tuples.length === 0) {
            this.tuples = undefined;
        } else if (tuples.length === 1) {
            this.setTuples(tuples[0]);
        }
        this.push = true;
        this.join = true;
    }
    /**
     * To get dead configuration
     * 
     * @readonly
     * @memberof Conversion
     */
    get DEADCONFIG() {
        return ['999'];
    }
    /**
     *  @abstract
     * 
     * @memberof Conversion
     */

    setTuples(tuples) {
        throw "setTuples() is an abbstract method and needs to be implemented.";
    }

    /**
     * Check if the given array is present in the transition array
     * 
     * @param {any} arr 
     * @param {any} val 
     * @returns 
     * @memberof Conversion
     */
    contains(arr, val) {
        let var1 = arr.find(item => {
            return this.check(item.tname, val);
        });

        if (var1)
            return true;
        return false;
    }

    check(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        return arr1.every(item1 => {
            return arr2.find(item2 => item2 == item1);
        });
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


    hasFinal(states) {
        return !states.every(state => {
            return !this.tuples.final.find(item => item == state);
        });
    }


    eClose(states) {
        let temp = [];

        temp.push(...states);
        let length;
        do {
            length = temp.length;

            temp.forEach(state => {
                if (this.tuples.transition[state] && this.tuples.transition[state]['$']) {
                    this.tuples.transition[state]['$'].forEach(item => {
                        if (temp.findIndex(st => st === item) === -1)
                            temp.push(item);
                    });
                }
            });
        } while (length !== temp.length);
        return temp;
    }

    /**
     * Generic method for making new transition
     * 
     * @returns 
     * @memberof Conversion
     */
    makeEquivalentTransition() {
        let transitionArr = [];
        transitionArr.push(...this.setInitialContent());
        let length;
        do {
            length = transitionArr.length;
            transitionArr.forEach(item => {
                if (!item.trans) {
                    item.trans = {};
                    this.tuples.alphabet.forEach(input => {
                        let itemTrans = this.itemTrans(item.tname, input);
                        if (itemTrans.length === 0) {
                            itemTrans = this.DEADCONFIG;
                        }
                        item.trans[input] = itemTrans.slice(0);

                        if (!this.contains(transitionArr, itemTrans) && this.push)
                            transitionArr.push({
                                tname: itemTrans
                            });
                    });
                }
            });

        } while (length !== transitionArr.length && this.push);

        //joining
        if (this.join) {
            transitionArr.forEach(item => {
                for (let input in item.trans) {


                    item.trans[input] = [item.trans[input].sort().join("")];
                }
            });
        }

        return transitionArr;

    }

    /**
     * Generic algo for Conversion
     * 
     * @returns 
     * @memberof Conversion
     */
    algo() {
        let transitionArr = this.makeEquivalentTransition();
        let states = [];
        let alphabet = this.tuples.alphabet;
        let initial = this.tuples.initial;
        let transition = {};
        let final = [];
        //State
        transitionArr.forEach(state => {
            states.push(state.tname.sort().join(""));
        });
        //transition
        transitionArr.forEach(state => {
            transition[state.tname.sort().join("")] = state.trans;
        });
        // console.log(transition);
        
        //final
        transitionArr.forEach(state => {
            if (this.hasFinal(this.eClose(state.tname)))
                final.push(state.tname.sort().join(""));
        });
        
        //initial
        states.every(item => {
            if (item.includes(initial)) {
                initial = [item];
                return false;
            }
            return true;
        });
        let tuple = this.makeTuple(states,alphabet,initial,final,transition);

        return tuple;
        
    }

    /**
     * External Method
     * 
     * @returns 
     * @memberof Conversion
     */
    convert() {
        if (this.tuples) {
            return this.algo();
        } else
            throw "No tuples defined.";
    }

    makeTuple(state,alphabet,initial,final,transition) {
        throw "makeTuple is abstract and needs to be implemented"
    }

}