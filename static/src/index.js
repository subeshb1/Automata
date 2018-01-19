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


let reg=  new RegEx('(a|b|c|d|e|f|g|h|i|j|k)(a|b|c|d|e)*');