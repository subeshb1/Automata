import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import DFAMinimizer from './FiniteAutomata/Actions/DFAMinimize.js';
import NFA from './FiniteAutomata/NFA.js';
import NFATuples from './FiniteAutomata/Tuples/NFATuples.js';
import ENFATuples from './FiniteAutomata/Tuples/ENFATuples.js'
let t1 = new DFATuples (['q0'],['a','b'],['q0'],['q0'],{q0:{a:['q0'],b:['q0']}});
let t2 = new NFATuples (['q0','q1'],['a','b'],['q0'],['q1'],{q0:{a:['q0'],b:['q1']},q1:{a:['q0'],b:['q1']}});

let dfa = new NFA();

dfa.tuples = t1;
console.log(dfa.check('ababab'));
dfa.tuples = t2;


console.log(dfa.check('ab'));

console.log(dfa);
