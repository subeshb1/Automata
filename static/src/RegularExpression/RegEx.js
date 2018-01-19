import PostfixExp from './tools/PostfixExp.js';
import RegExpToENFA from './tools/RegExpToENFA.js';

export default class RegEx {
    constructor(regExp) {
        this.post = new PostfixExp();
        this.regExp = this.post.toPostfix(regExp);
        this.enfa = new RegExpToENFA(this.regExp);
        this.dfa = this.enfa.algo();
    }
    check(input) {
        return this.dfa.check(input);
    }
}