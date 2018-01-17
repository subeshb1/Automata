
const DEADCONFIG = "999";
/**
 * Base Class for all the conversion in Finite Automata
 * 
 * @export
 * @class Conversion
 */
export default class Conversion {
    constructor(...tuples) {
        if(tuples.length === 0) {
            this.tuples = undefined;
        } else if(tuples.length === 1) {
            this.setTuples(tuples[0]);
        }
    }
    static get DEADCONFIG() {
        return DEADCONFIG;

    }
    convert() {
        throw "setTuples() is an abbstract method and needs to be implemented.";   
    }
    setTuples(tuples) {
        throw "setTuples() is an abbstract method and needs to be implemented.";
    }

    contains(arr,val) {
        let var1 = arr.find( item => {
            return this.check(item.tname ,val);
        });
        
        if(var1)
            return true;
        return false;
    }

    check(arr1,arr2) {
        if(arr1.length !== arr2.length)
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

}