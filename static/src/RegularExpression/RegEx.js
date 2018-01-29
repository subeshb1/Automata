import PostfixExp from './tools/PostfixExp.js';
import RegExpToENFA from './tools/RegExpToENFA.js';

export default class RegEx {
    constructor(regExp) {
        this.post = new PostfixExp();
        this.regExp = this.post.toPostfix(regExp);
        this.converter = new RegExpToENFA(this.regExp);
        this.enfa = this.converter.algo();
        
    }
    check(input) {
        return this.enfa.check(input);
    }
}