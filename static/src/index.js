import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
import ENFA from './FiniteAutomata/ENFA.js';
import NfaToDfa from './FiniteAutomata/Actions/NfaToDfa.js';
 let nfa = new NFATuples(['q0','q1'],['a','b'],['q0'],['q1'], {
    q0: {
        a:['q0'],
        b:['q1']
    },q1: {
        a:['q0'],
        
    }
 });

 
 console.log(nfa);
 
 let nfa1 = new NFA(nfa);
 
 