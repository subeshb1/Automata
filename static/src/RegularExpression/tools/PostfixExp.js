export default class PostfixExp {
    constructor(string) {
        // this.setString(string);
    }

    toPostfix(string) {
        if (!string.length)
            throw "Nothing passed";
        let str = this.formatString(string);
        let postFix = "";
        let opStack = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                opStack.push(str[i]);
            } else if (this.isOperand(str[i])) {
                postFix += str[i];
            } else if (this.isOperator(str[i])) {
                if (str[i] == '+' || str[i] == '*') {
                    postFix += str[i];
                } else if (opStack.length) {
                    while (this.precedence(opStack[opStack.length - 1]) >= this.precedence(str[i])) {
                        postFix += opStack.pop();
                    }
                    opStack.push(str[i]);
                } else
                    opStack.push(str[i]);

            } else if (str[i] == ')') {
                while (opStack[opStack.length - 1] != '(') {
                    postFix += opStack.pop();
                }
                opStack.pop();

            } else
                throw "Error";

        }
        while (opStack.length) {
            postFix += opStack.pop();
        }
        return postFix;
    }
    isOperand(char) {
        char = char.toLowerCase();
        if ((char >= '0' && char <= '9') || (char >= 'a' && char <= 'z') || char == '$') {
            return true;
        }
        return false;
    }

    formatString(string) {
        string = string.replace(/ /g, '');

        for (let i = 1; i < string.length; i++) {
            let s0 = string[i-1];
            let s1 = string[i];
            if ( ( (this.isOperand(s0) || s0 == '*'|| s0 == '+') && this.isOperand(s1) ) ||
                 ( (this.isOperand(s0) || s0 == '*'|| s0 == '+') && s1 == '(') ||
                 ( s0 ==')' && s1 == '(')

            ) {
                string = string.substr(0, i) + '.' + string.substr(i, string.length - 1);
            }
        }
        return string;
    }
    isOperator(char) {
        if (char === '|' || char == '.' || char == '*' || char == '+')
            return true;
        return false;
    }
    precedence(char) {
        if (char == '|')
            return 4;
        if (char == '.')
            return 5;
        if (char == '(')
            return 1;
    }

}