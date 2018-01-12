
/**
 * 
 * 
 * @export
 * @class FATuples
 */
export class FATuples {
    /**
     * Creates an instance of FATuples.
     * @description Should contain [states],[alphabet],[initial],[final],{transition} in order
     * @param1 {Array} state
     * @param2 {Array} alphabet
     * @param3 {Array} initial
     * @param4 {Array} final
     * @param5 {Object} transition
     * @memberof FATuples
     */
    constructor(...tuples) {

        if(tuples.length === 5 || tuples.length === 0) {
            this.state_ = [];
            this.alphabet_ = [];
            this.initial_ =  [];
            this.final_ = [];
            this.transition_ = {};
            if(tuples.length === 5) {
                this.state = tuples[0];
                this.alphabet = tuples[1];
                this.initial = tuples[2];
                this.final = tuples[3];
                // this.transition = tuples[4];
            }
        }
        else 
         throw "There must be 5 or 0 tuples";
    
    }


    
    get state() {

        let state = this.state_.map(item => item);
        return state;

    }

    set state(state) {
        if(state instanceof Array)  {
            let isString = state.every( item => typeof item === 'string' );
            if(isString)
                this.state_ = state;
            else 
                throw "The Array item must be a String in state Array";
        }
        else 
            throw "State must be array";
        
    }


    get final() {

        let final = this.final_.map(item => item);
        return final;
        
    }
    set final(final) {
        if(final instanceof Array)  {
            let isString = final.every( item => typeof item === 'string' );
            if(isString)
                this.final_ = final;
            else 
                throw "The Array item must be a String in final Array";
        }
        else 
            throw "final must be array";
        
    }


    get alphabet() {

        let alphabet = this.alphabet_.map(item => item);
        return alphabet;
        
    }

    set alphabet(alphabet) {
        if(alphabet instanceof Array)  {
            let isString = alphabet.every( item => typeof item === 'string' );
            if(isString)
                this.alphabet_ = alphabet;
            else 
                throw "The Array item must be a String in alphabet Array" ;
        }
        else 
            throw "Albhabet must be array";
        
    }


    get initial() {

        let initial = this.initial[0];
        return initial;
        
    }

    set initial(initial) {
        if(initial instanceof Array)  {
            if(initial.length === 1) {
                let isString = initial.every( item => typeof item === 'string' );
                if(isString) {
                    if(!this.state.find( item => item === initial[0]))
                        throw "The initial state doesn't belong to set of states"
                    this.initial_ = initial;
                }
                else 
                    throw "The Array item must be a String";
            } else throw "The Array item must be a String";
        }
        else 
            throw "State must be array";
        
    }


    // get state() {

    //     let state = this.state_.map(item => item);
    //     return state;
        
    // }
    // set state(state) {
    //     if(state instanceof Array)  {
    //         let isString = state.every( item => typeof item === 'string' );
    //         if(isString)
    //             this.state_ = state;
    //         else 
    //             throw "The Array item must be a String";
    //     }
    //     else 
    //         throw "State must be array";
        
    // }


}


