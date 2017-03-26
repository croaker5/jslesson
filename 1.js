var later = require('later');
later.date.localTime();//用于设置时间的初始值
console.log("Now:"+new Date());
var sched = later.parse.recur().every(1).hour()//设定循环模式，这里是每小时使用一次

next = later.schedule(sched).next(10);
console.log(next);

var timer = later.setInterval(test, sched);
function test(){
   console.log(new Date());
}