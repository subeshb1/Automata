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
import RegEx from './RegularExpression/RegEx.js';

let reg=  new RegEx('(0|1(1|011)*(00|010))*1(1|011)*01');
console.log(reg.check('01010'));

