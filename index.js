var later = require('later');
later.date.localTime();//将时间设定为当前时间
console.log("Now:"+new Date());
var sched = later.parse.recur().every(5).second()//设定循环模式，每五秒一次
var timer = later.setInterval(test, sched);
function test(){
   console.log(new Date());
}
