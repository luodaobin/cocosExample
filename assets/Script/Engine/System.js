/**********************************************
Value               Class      Type
-------------------------------------
"foo"               String     string
new String("foo")   String     object
1.2                 Number     number
new Number(1.2)     Number     object
true                Boolean    boolean
new Boolean(true)   Boolean    object
new Date()          Date       object
new Error()         Error      object
[1,2,3]             Array      object
new Array(1, 2, 3)  Array      object
new Function("")    Function   function
/abc/g              RegExp     object (function in Nitro/V8)
new RegExp("meow")  RegExp     object (function in Nitro/V8)
{}                  Object     object
new Object()        Object     object
************************************************************/

var System = function () {
};
System.prototype.getClass=function(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
};
System.prototype.isTyeOf=function(type,obj){
    var clas = this.getClass(obj);
	return obj !== undefined && obj !== null && clas === type;
};
System.prototype.isNumber=function(value){
    return this.isTyeOf('Number',value);
};
System.prototype.isString=function(value){
    return this.isTyeOf('String',value);
};
System.prototype.isBoolean=function(value){
    return this.isTyeOf('Boolean',value);
};
System.prototype.isDate=function(value){
    return this.isTyeOf('Date',value);
};
System.prototype.isError=function(value){
    return this.isTyeOf('Error',value);
};
System.prototype.isArray=function(value){
    return this.isTyeOf('Array',value);
};
System.prototype.isFunction=function(value){
    return this.isTyeOf('Function',value);
};
System.prototype.isRegExp=function(value){
    return this.isTyeOf('RegExp',value);
};
System.prototype.isObject=function(value){
    return this.isTyeOf('Object',value);
};
var sys = new System();
module.exports = sys;