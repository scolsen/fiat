/**
 * Created by scolsen on 6/2/2017.
 * Primary test suite.
 * Requires Mocha and Sinon.
 */

const assert = require('assert');
const sinon = require('sinon');
require('../fiat');

//test functions
function addThem(a, b){
    return a + b;
}

function multiplyThem(a, b){
    return a * b;
}

//Base test suite, check fundamental support functions
describe('BASE', function () {
    before(function(){
        //run before the suite
    });
    after(function () {
        //run after the suite
    });

    describe('#compose()', function(){
        it('Should be a function', function(){
            assert.equal(typeof(Function.prototype.compose), 'function');
        });
        it('Should return a function running the function calling' +
            'compose as the argument to the function passed to compose', function () {
            let test = addThem(1,2).compose(multiplyThem)();
            console.log(test);
        });
    });
});

