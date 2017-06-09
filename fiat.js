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
//Function.prototype.curry = function(fn){
//    let origin = this().f;
//    return function(){
//        return fn(origin())();
//    }
//};
//
//Function.prototype.curryR = function(fn){
//    let origin = arguments.callee.n;
//    console.log(origin());
//    let arg = this().s;
//    return function(){
//        return origin.apply(fn(arg()));
//    }
//};
//
////We must execute functions all the way to the bottom of the stack
////thus we need to provide a wrapper function for return values of our function defintions.
//function composable(x, a, f){
//     function wrap(j, f){return {f: ()=>{return x}, s: ()=>{return a}, n: ()=>{return f}}} //for rightbound composition, if bound to an argument, return the argument, else return the result
//     return ()=>{return wrap(a, f)};
//}
//function add(a){
//    return composable(a + 2, a, arguments.callee);
//}
//
//function multiply(a){
//    return composable(a * 6, a, arguments.callee);
//}
//let f = add(4).curry(add).curry(multiply)().s();
//let l = add(4).curryR(add).curryR(multiply)();
//console.log(f);
//console.log(l);

function unit(){
    return ()=>{return null};
}

function singleton(x){
    return () => {return x};
}

function tuple(x, y){
    let args = [...arguments];
    if (args.length < 2) {return tuple(x, unit())}
    return singleton({
            1: singleton(x),
            2: singleton(y)
           });
}

/**
 * 'Unwraps' the values contained in nested lambda/anonymous functions.
 * Returns the first non-function value it hits.
 * @param fn
 * @returns {*}
 */
function unlambda(fn){
    if(typeof(fn()) === 'function'){return unlambda(fn())} //if the result of executing the function is another function nest another unlambda.
    return fn();
}

function curry(f, g){
    if(typeof g === 'function'){return singleton(f(unlambda(g)))}
    return singleton(f(g));
}

//Should create a functional pattern like the following:
//fn(fn(fn(x)y)z)
//use: expand(tuple, 1, 2);
function expand(fn){
    let args = [...arguments];
    let func = unlambda(args[0]);
    for(k=1; k<args.length; k++){
        func = unlambda(func[args[k]]);
    }
    return func;
}

function unnest(tuple){
    let args = [...arguments];
    let func = unit();
    for(k=0; k<args.length; k++){

    }
}

function xle(){
    let args  = [...arguments];
    let func = unit(); //we define a temporary function to recursively build up our chain.
    for (k=0; k<args.length; k++){
        func = tuple(args[k], func);
    }
    return func;
}


exports.unit = unit;
exports.singleton = singleton;
exports.tuple = tuple;
exports.curry = curry;
exports.unlambda = unlambda;
exports.xle = xle;
exports.expand = expand;
