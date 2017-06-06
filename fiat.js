/**
 * Created by scolsen on 6/2/2017.
 * Fiat.js - a collection of functions for building Functional CLIs
 */

/**
 *  Base/Support Functions
 *  Override Funciton prototype with currying function.
 *  @fn {Function} - function to curry.
 */

//returns an autoexecuting function to assemble
//compositons of functions. Without the returns, because of
//Js default behavior, returns undefined.
Function.prototype.curry = function(fn){
    let origin = this().f;
    return function(){
        return fn(origin())();
    }
};

Function.prototype.curryR = function(fn){
    let origin = this().n();
    let arg = this().s;
    return function(){
        return origin.bind(null, fn(arg()));
    }
};

//We must execute functions all the way to the bottom of the stack
//thus we need to provide a wrapper function for return values of our function defintions.
function composable(x, a, f){
     function wrap(j, f){return {f: ()=>{return x}, s: ()=>{return a}, n: ()=>{return f}}} //for rightbound composition, if bound to an argument, return the argument, else return the result
     return ()=>{return wrap(a, f)};
}

function add(a){
    return composable(a + 2, a, arguments.callee);
}

function multiply(a){
    return composable(a * 6, a, arguments.callee);
}
let f = add(4).curry(add).curry(multiply)().s();
let l = add(4).curryR(add).curryR(multiply)();
console.log(f);
console.log(l);
