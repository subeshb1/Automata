import FA from './FiniteAutomata/FA.js';
import FATuples from './FiniteAutomata/Tuples/FATuples.js';
import DFA from './FiniteAutomata/DFA.js';
import DFATuples from './FiniteAutomata/Tuples/DFATuples.js';
import DFAMinimizer from './FiniteAutomata/Actions/DFAMinimize.js';

//  try {
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
    
    let hari = new DFA(subesh);
    console.log(hari);

    let aakanchhya = new DFAMinimizer(hari);
    aakanchhya.minimize();
    console.log(aakanchhya);
    
    
// } catch (e) {
//     console.log(e);

// }

