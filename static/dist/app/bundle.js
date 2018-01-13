/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * 
 * 
 * @export
 * @class FATuples
 */
class FATuples {
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

        let state = this.state_.slice(0);
        return state;

    }

    set state(state) {
        if(state instanceof Array)  {
            let isString = state.every( item => typeof item === 'string' );
            if(isString)
                this.state_ = state.slice(0);
            else 
                throw "The Array item must be a String in state Array";
        }
        else 
            throw "State must be array";
        
    }


    get final() {

        let final = this.final_.slice(0);
        return final;
        
    }
    set final(final) {
        if(final instanceof Array)  {
            let isString = final.every( item => typeof item === 'string' );
            if(isString) {
                if(!final.every( item => this.state.find( state => state == item)))
                    throw "The final state set is not a subset of States";
                this.final_ = final.slice(0);
            }
            else 
                throw "The Array item must be a String in final Array";
        }
        else 
            throw "final must be array";
        
    }


    get alphabet() {

        let alphabet = this.alphabet_.slice(0);
        return alphabet;
        
    }

    set alphabet(alphabet) {
        if(alphabet instanceof Array)  {
            let isString = alphabet.every( item => typeof item === 'string' );
            if(isString)
                this.alphabet_ = alphabet.slice(0);
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
                    this.initial_ = initial.slice(0);
                }
                else 
                    throw "The Array item must be a String";
            } else throw "The Array item must be a String";
        }
        else 
            throw "State must be array";
        
    }


    // get state() {

    //     let state = this.state_.slice(0);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = FATuples;





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FiniteAutomata_FA__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FiniteAutomata_Tuples_FATuples__ = __webpack_require__(0);




let subesh = new __WEBPACK_IMPORTED_MODULE_1__FiniteAutomata_Tuples_FATuples__["a" /* FATuples */](['q0'],['a','b'],['q1'],['q0'],{});
console.log(subesh);

console.log('Subesh');


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tuples_FATuples__ = __webpack_require__(0);


/**
 * @summary A class that builds a structure to the Finite Automation.
 * @export
 * @abstract @class FA
 * 
 * 
 */
class FA {
    /**
     * Creates an instance of FA.
     * @param {FATuples} tuples 
     * @memberof FA
     */
    constructor(tuples) {
        this.tuples_ = tuples;
    }


}
/* unused harmony export default */




/***/ })
/******/ ]);