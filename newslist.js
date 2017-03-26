var http = require('http');
var server = http.createServer(function(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.writeHead(404,{
    	'abc':'123'//可以通过此方法向http响应报文的头部中添加信息
});
    res.end('Hello World!');



});
server.listen(3001);