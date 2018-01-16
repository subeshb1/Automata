
import NFATuples from '../Tuples/NFATuples.js'
import DFATuples from '../Tuples/DFATuples.js';

const DEADCONFIG = "999";
export default class NfaToDfa {
    constructor(tuples) {
        
        if(arguments.length === 0) {
            this.tuples = undefined;
        } else if(arguments.length === 1) {
            this.setNFATuples(tuples);
        }

    }
    setNFATuples(tuples) {
        if(!tuples || !(tuples instanceof NFATuples))
            throw "Can only take instance of NFATuples.";
        this.tuples = tuples;
    }

    convertToDFA() {
        if(this.tuples)
        {
            return this.subSetConstruction();
        }
        else 
            throw "No tuples defined.";
    }

    subSetConstruction() {
        let transitionArr = this.makeEquivalentTransition();
        let dfa = new DFATuples();
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
            transition[state.tname.join("")] = state.trans;
        });
        // console.log(transition);
        
        //final
        transitionArr.forEach(state => {
            if(this.hasFinal(state.tname)) 
                final.push(state.tname.sort().join(""));
        });
        dfa.state = states;
        dfa.alphabet = alphabet;
        dfa.initial = initial;
        dfa.final = final;
        dfa.transition =  transition;
        
        return dfa;
    }

    makeEquivalentTransition() {
        let transitionArr = [];
        transitionArr.push({tname:this.tuples.initial});
        let length;
         do{
            length = transitionArr.length;
            transitionArr.forEach( item=> {
                if(!item.trans) {
                    item.trans = {};   
                    this.tuples.alphabet.forEach( input => {
                        let itemTrans = this.transition(item.tname,input);
                        if(itemTrans.length === 0) {
                            itemTrans = [NfaToDfa.DEADCONFIG];
                        }
                        item.trans[input] = itemTrans.slice(0);
                        if(!this.contains(transitionArr,itemTrans))
                             transitionArr.push({tname:itemTrans});
                    });
                }
            });
        }while(length !== transitionArr.length);
        //joining
        transitionArr.forEach(item => {
            for(let input in item.trans) {
                
                
                item.trans[input] = [item.trans[input].sort().join("")];
            }
        });    
        
         return transitionArr;
    }
    static get DEADCONFIG() {
        return DEADCONFIG;

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














