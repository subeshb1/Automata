import RegEx from '../RegularExpression/RegEx.js';

export default class StringSearch {
    constructor(string) {
        this.string = string;
        
    }
    test(searchString) {
        let searchLenght = searchString.length;
        let regEx = new RegEx(searchString);
        
        let length = this.string.length;
        let text = this.string;

        for(let i = 0;  i < length; i++) {
            try {
                if( (i+searchLenght) <=  length)
                    if( regEx.check( text.substring( i,i+searchLenght))  )
                        return i;
            } catch(e) {
               
                
            }
        }
        
        return false;
    }
}