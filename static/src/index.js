import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
let t1 = new DFATuples (['q0','q1','q2'],['0','1'],['q0'],['q2','q0'],{
    q0: {
        0:['q1'],
        1:['q0']
    },
    q1: {
        0:['q2'],
        1:['q1']
    },
    q2: {
        0:['q1'],
        1:['q2']
    }
});
let subesh = new DFATuples(['A','B','C','D','E','F','G','H','I'],['a', 'b'],['A'],['C','D','F','H'],{
    A : {
        a:['B'],
        b:['I']
    },
    B : {
        a:['C'],
        b:['D']
    },
    C : {
        a:['E'],
        b:['G']
    },
    D : {
        a:['G'],
        b:['E']
    },
    E : {
        a:['E'],
        b:['E']
    },
    F : {
        a:['E'],
        b:['G']
    },
    G : {
        a:['G'],
        b:['G']
    },
    H : {
        a:['E'],
        b:['G']
    },
    I : {
        a:['F'],
        b:['H']
    }
});


let dfa = new DFA();

dfa.tuples = subesh;
console.log(subesh);
dfa.tuples = dfa.minimize();
console.log(dfa.tuples);

console.log(dfa.check('aaa'));

dfa.tuples = t1;
console.log(t1);
dfa.tuples = dfa.minimize();
console.log(dfa.tuples);

console.log(dfa.check('010100'));


