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
    let origin = this;
    return function(){
        return fn(origin())();
    }
};

Function.prototype.curryR = function(fn){
    let origin = this;
    return function(){
        console.log(fargs());
        return origin(fn(fargs()))();
    }
};

function fargs(){
    return arguments.callee.caller.arguments.callee.arguments;
}
//We must execute functions all the way to the bottom of the stack
//thus we need to provide a wrapper function for return values of our function defintions.
function composable(x){
    return ()=>{return x};
}

function add(a){
    return composable(a + 2);
}

function multiply(a){
    return composable(a * 6);
}
let f = add(4).curry(add).curry(multiply)();
let l = add(4).curryR(add).curryR(multiply)();
console.log(f);

