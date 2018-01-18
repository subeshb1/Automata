import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
import ENFA from './FiniteAutomata/ENFA.js';
import NfaToDfa from './FiniteAutomata/Actions/NfaToDfa.js';
import EnfaToDfa from './FiniteAutomata/Actions/EnfaToDfa.js';
import EnfaToNfa from './FiniteAutomata/Actions/EnfaToNfa.js';

let dt = new ENFATuples();
dt.state = ['0','1','2','3','4','5','6','7','8'];
dt.alphabet = ['a','b'];
dt.initial = ['0'];
dt.final = ['8'];
dt.transition = {
    0: {
        
        $:['1','7']
    },
    1: {
       
        $: ['2','4']
    },
    2: {
        a: ['3'],
        
    },
    3: {
        $: ['6'],
        
    },
    4: {
        b: ['5'],
        
    },
    5: {
        $: ['6'],
        
    },
    6: {
        $: ['7','1'],
        
    },
    7: {
        a: ['8'],
        
    }

}


let enfa = new ENFA(dt);
console.log(dt);


let nfa = new NFA(enfa.toNfa());
console.log(nfa.tuples);
console.log(enfa.toDfa());


let dfa = new DFA(nfa.toDFA(true) );
console.log(dfa.tuples);

console.log(dfa.minimize(true));
 
console.log(dfa.check('abba'));

