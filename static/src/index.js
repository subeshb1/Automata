import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
import ENFA from './FiniteAutomata/ENFA.js';
import NfaToDfa from './FiniteAutomata/Actions/NfaToDfa.js';



let etup2 = new NFATuples(['q0','q1','q2','q3'],['a','b'],['q0'],['q2','q3'],{
    q0:{
        b:['q0'],
        a:['q0','q1']
        
    },
    q1:{
        a:['q2'],
        b:['q1']
        
    },
    q2:{
        a:['q3'],
        b:['q3']
    },
    q3: {
        b:['q2']
    }
});

let nfa = new NFATuples(['A','B','C','D'],['a','b'],['A'],['A','B'], {
    A: {
        a: ['B','C'],
        b: []
    },
    B: {
        a: ['B','C'],
        b: []
    },
    C: {
        b: ['B','D'],
        a: []
    },
    B: {
        a: ['B','C'],
        b: []
    }
});
 let nfaW = new NFA();
 nfaW.tuples = etup2;
 console.log(nfaW.toDFA());
 nfaW.tuples = nfa;
 console.log(nfaW.toDFA());
 