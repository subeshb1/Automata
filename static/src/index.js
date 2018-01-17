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
 let nfa = new ENFATuples(['q0','q1','q2'],['a','b','c'],['q0'],['q2'], {
    q0: {
        a:['q0'],
        $:['q1']
    },q1: {
        b:['q1'],
        $:['q2']
        
    },
    q2: {
        c:['q2']
    }
 });

 console.log(nfa);
  let conv = new EnfaToNfa();
  conv.setTuples(nfa);
  let nfa2 = conv.convert();
  console.log(nfa2);
  let conv2 = new NfaToDfa(nfa2);
  
  
 let dfa = new DFA(conv2.convert());
//  dfa.changeTupleStateName('q');
 console.log(dfa.check('abcc'));