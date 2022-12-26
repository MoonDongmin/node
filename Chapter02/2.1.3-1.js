var sayNode = function(){
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJs: function(){
    console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es+6]='Fantastic';
oldObject.sayNode();
oldObject.sayJs();
console.log(oldObject.ES6);

//객체 리터럴 사용
const newObject={
    sayJs(){
        console.log('JS');
    },
    sayNode,
    [es+6]: 'Fantastic',
};
newObject.sayNode();
newObject.sayJs();
console.log(newObject.ES6);