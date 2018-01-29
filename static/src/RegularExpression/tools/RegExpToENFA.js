import ENFATuples from "../../FiniteAutomata/Tuples/ENFATuples.js";
import ENFA from "../../FiniteAutomata/ENFA.js";
import DFA from "../../FiniteAutomata/DFA.js";

class CombineState {
    constructor(start,end,next) {
        this.start = start;
        this.end = end ;
        

    }
}

class State {
    constructor(name) {
        this.name = 'q' + name;
        this.transition = {};
    }
    addTransition(input,...state) {
        if(!this.transition[input])
            this.transition[input] = [];
        this.transition[input].push(...state);
    }

}



export default class RegExpToENFA {
    constructor(regExp) {
        this.regExp = regExp;
        this.count = 0;
        this.state = [];
        this.startState = this.createState();
        this.finalState = undefined;
    }

    algo() {
        
        let str = this.regExp;
        let valueStack = [];

        for(let i = 0; i < str.length; i++) {
            let char = str[i];
            if(this.isOperand(char)) {
                valueStack.push(this.createSingle(char));
            }
            else if(this.isOperator(char)) {
                if(char == '*') {
                    let op = valueStack.pop();
                    valueStack.push(this.createClosure(op,true));
                
                } else if(char == '+') {
                    let op = valueStack.pop();
                    valueStack.push(this.createClosure(op));
                } else if(char == '.') {    
                    let op2 = valueStack.pop();
                    let op1 = valueStack.pop();
                    valueStack.push(this.createConcat(op1,op2));
                } else if(char == '|') {    
                    let op2 = valueStack.pop();
                    let op1 = valueStack.pop();
                    valueStack.push(this.createUnion(op1,op2));
                }

            }
        }
        this.startState.addTransition('$',valueStack[0].start);
        this.finalState = this.createState();
        valueStack[0].end.addTransition('$',this.finalState);
        return this.makeENFAToDFA();
    }

    //Returns Combine state for a transition input 'a'
    isOperand(char) {
        char = char.toLowerCase();
        if ((char >= '0' && char <= '9') || (char >= 'a' && char <= 'z') || char == '$') {
            return true;
        }
        return false;
    }
    isOperator(char) {
        if(char === '|' || char =='.' || char == '*' || char == '+' )
        return true;
        return false;
    }
    
    createSingle(input) {
        let start = this.createState();
        let end = this.createState();
        start.addTransition(input,end);
        return new CombineState(start,end);
    }
    createClosure(comb,kleen) {

        comb.end.addTransition('$',comb.start);

        if(kleen)
            comb.start.addTransition('$',comb.end); 
        return comb;
    }

    createConcat(comb1,comb2) {
        comb1.end.addTransition('$',comb2.start);
        return new CombineState(comb1.start,comb2.end);
    }

    createUnion(comb1,comb2) {
        let start = this.createState();
        let end = this.createState();
        start.addTransition('$',comb1.start,comb2.start);
        comb1.end.addTransition('$',end);
        comb2.end.addTransition('$',end);
        return new CombineState(start,end);
    }


    createState() {
        let s = new State(this.count++);
        this.state.push(s);
        return s;
    }
    findAlphabet(input) {
        let alphabet = [];
        for(let i = 0; i < input.length; i++) {
            if(this.isOperand(input[i]) && !alphabet.includes(input[i]) && input[i]!=='$') {
                alphabet.push(input[i]);
            }
        }
        return alphabet;
    }

    //REspecive ENFA to DFA
    makeENFAToDFA() {
        let state = this.state.map(item => item.name);
        // console.log(state);
        let alphabet = this.findAlphabet(this.regExp);
        let initial = [this.startState.name];
        let final = [this.finalState.name];

        let transition = {};

        this.state.forEach(state => {
            transition[state.name] = {};
            for(let input in state.transition) {
                transition[state.name][input] = state.transition[input].map(item => item.name);
            }
        });

        let enfat = new ENFATuples(state,alphabet,initial,final,transition);
        

        return new ENFA (enfat);
    }

}