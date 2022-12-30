const string = 'abc';
const num = 1;
const boolean = true;
const obj ={
    outside:{
        inside:{
            key: 'value',
        },
    },
};
console.time('전체시간');
console.log('평범한 로그 쉼표로 구분해 여러 값 찍을 수 있음');
console.log(string, num, boolean);
console.error('어러 메시지는 console.error에 담아주세요');

console.table([{name: 'zero', birth: 1994}, {name: 'hero',birth:1988}]);

console.dir(obj, {color: false, depth:2});
console.dir(obj, {color: true, depth:1});

console.time('시간 측정');
for(let i=0; i<100000; i++){}
console.timeEnd('시간 측정');

function b(){
    console.trace('에러 위치 추적');
}
function a(){
    b();
}
a();

console.timeEnd('전체 시간');
