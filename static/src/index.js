import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
import ENFA from './FiniteAutomata/ENFA.js';



let etup = new DFATuples();
etup.state = ['q0','q1','q2'];
etup.alphabet = ['a','b'];
etup.initial = ['q0'];
etup.final = ['q2'];
etup.transition = {
    q0: {
        a:['q0'],
        b:['q1']
    },
    q1: {
        b:['q1'],
        a:['q2']
    },
    q2:{
        a:['q2'],
        b:['q2']
    }
    
};

let etup2 = new ENFATuples(['q0','q1','q2'],['0','1'],['q0'],['q2'],{
    q0:{
        0:['q0'],
        $:['q1']
    },
    q1:{
        1:['q1'],
        $:['q2']
    },
    q2:{
        0:['q2']
    }
});

let etup3 = new ENFATuples();
etup3.state = ['0','1','2','3','4','5','6','7','8'];
etup3.alphabet = ['a','b'];
etup3.initial = ['0'];
etup3.final = ['8'];
etup3.transition = {
    0:{
        $:['1','7']

    },
    1:{
        $:['2','4']

    },
    2:{
        a:['3']

    },
    3:{
        $:['6']

    },
    4:{
        b:['5']

    },
    5:{
        $:['6']

    },
    6:{
        $:['1','7']

    },
    7:{
        a:['8']

    }
    
};
let enfa = new NFA(etup);
console.log(enfa.check('a'));
console.log(enfa);
// enfa.tuples = etup2;
// console.log(enfa.check(''));
// console.log(enfa);
