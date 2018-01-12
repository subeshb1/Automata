import FA from './FA';
import {FATuples} from './FA';

export default class DFA extends FA {
    constructor(tuples) {
        super(tuples);

        console.log(this._tuples + "sds");
        
    }
}

export class DFATuples extends FATuples {
    
}