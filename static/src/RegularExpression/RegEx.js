import PostfixExp from './tools/PostfixExp.js';
import RegExpToENFA from './tools/RegExpToENFA.js';

export default class RegEx {
    constructor(regExp) {
        
        this.post = new PostfixExp();
        this.regExp = this.post.toPostfix(regExp);
        console.log(this.regExp);
        this.enfa = new RegExpToENFA(this.regExp);
        this.enfa.algo();
        
        
    }
}