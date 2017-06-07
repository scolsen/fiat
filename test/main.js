/**
 * Created by scolsen on 6/2/2017.
 * Primary test suite.
 * Requires Mocha and Sinon.
 */

const assert = require('assert');
const sinon = require('sinon');
const fiat = require('../fiat');

//test functions
function addThem(a, b){
    return a + 2;
}

function multiplyThem(a, b){
    return a * 2
}

//Base test suite, check fundamental support functions
describe('BASE', function () {
    before(function(){
        //run before the suite
    });
    after(function () {
        //run after the suite
    });

    //describe('#compose()', function(){
    //    it('Should be a function', function(){
    //        assert.equal(typeof(Function.prototype.compose), 'function');
    //    });
    //    it('Should return a function running the function calling' +
    //        'compose as the argument to the function passed to compose', function () {
    //        let test = addThem(1,2).compose(multiplyThem)();
    //        console.log(test);
    //    });
    //});
   let ul = fiat.unlambda; //alias unlambda for less typing.
   let cu = fiat.curry; //alias for curry for less typing.

    describe('#unit()', function(){
        it('Should return null', function(){
            ul(fiat.unit());
        });
    });

    describe('#unlambda()', function(){
        it('Should execute nested anonymous functions until a non fn value is derived.', function(){
           let test = function (){
               return ()=>{
                   return () => {
                       return ()=>{
                           return 1;
                       }
                   }
               }
           };
           let single = function(){
               return 2;
           };
           assert.equal(fiat.unlambda(test), 1);
           assert.equal(fiat.unlambda(single), 2);
        });
    });

    describe("#tuple()", function(){
        it('Should return an object containing two anonymous functions', function(){
            let tup = fiat.tuple(1,'a');
            assert.equal(typeof(tup), 'object');
            assert.equal(ul(tup[1]), 1);
            assert.equal(ul(tup[2]), 'a');
        });

        it('Should return a tuple with a unit/null value if given one argument.', function(){
            let tup = fiat.tuple(3);
            assert.equal(ul(tup[1]), 3);
            assert.equal(ul(tup[2]), ul(fiat.unit));
        });
    });

    describe("#curry()", function(){
        it('Should return the result of applying the argumen to the fn', function(){
            assert.equal(typeof(fiat.curry(addThem, 4)), 'function');
            assert.equal(ul(cu(addThem, 4)), 6);
            assert.equal(typeof(cu(multiplyThem, cu(addThem, 4))), 'function');
            assert.equal(ul(cu(multiplyThem, cu(addThem, 4))), 12);
        });
    });

    describe('#xle()' ,function(){
        it('Should create just a tuple with the single argument and unit.', function(){
            let uni = fiat.xle('one');
            let tup = fiat.tuple('one', fiat.unit());
            assert.equal(ul(uni[1]), ul(tup[1]));
            assert.equal(ul(uni[2]), ul(tup[2]));
        });

        it('Should create a triple.', function(){
            let tri = fiat.xle('one', 'two', 'three');
            assert.equal(ul(tri[1]), 'three');
            assert.equal(typeof(ul(tri[2])), 'object');
            console.log(ul(tri[2]));
        });
    });
});
