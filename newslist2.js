var http = require('http');

var NEWS = {
     1:'这里是第一篇新闻的内容',
     2:'这里是第二篇新闻的内容',
     3:'这里是第三篇新闻的内容'
};
function getNews(id){
	return NEWS[id] || '文章不存在';
}
var server = http.createServer(function (req,res){
    
    function send (html){
         res.writeHead(200,{
         	'content-type':'text/html;charset=utf-8'
         });
         res.end(html);


    }
    if (req.url === '/'){
         send('<ul>'+
         	'<li><a href="/news?type=1&id=1">新闻一</a></li>'+
            '<li><a href="/news?type=1&id=2">新闻二</a></li>'+
            '<li><a href="/news?type=1&id=3">新闻三</a></li>'+
            '</ul>');


    }else if(req.url === '/news?type=1&id=1'){
        send(getNews(1));                       //可以通过超链接方式实现页面跳转，但存在的问题是由于使用的是字符串相等的判断，所以参数
                                                 //必须以特定的顺序出现，即如果在地址栏中将type和id的顺序颠倒则无法访问
                                                 //所以在newslist3中引入第三方模块url来动态解析get请求中的参数

    }else if(req.url === '/news?type=1&id=2'){
        send(getNews(2));
    }else if(req.url === '/news?type=1&id=3'){
        send(getNews(3));
    }else{
        send('<h1>文章不存在！</h1>');
    }



});
server.listen(3001);