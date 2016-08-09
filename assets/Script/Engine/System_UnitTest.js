var sys=require('./System');
console.assert(sys.isString('test')); // true
console.assert(sys.isString(new String('aaa'))); // true
console.assert(sys.isNumber(1)); // true
console.assert(sys.isNumber(1.0)); // true
console.assert(sys.isNumber(new Number(1.2))); // true
console.assert(sys.isNumber(new Number(1.2))); // true
console.assert(sys.isBoolean(true)); // true
console.assert(sys.isBoolean(false)); // true
console.assert(sys.isDate(new Date('2014-10-10'))); // true
console.assert(sys.isArray([])); // true
console.assert(sys.isArray(new Array(1,2,3))); // true
console.assert(sys.isFunction(function(){})); // true
console.assert(sys.isObject({})); // true
