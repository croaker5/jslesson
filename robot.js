var PORT = 80;
var http = require('http');
var qs = require('qs');
var TOKEN = 'math';


function checkSignature(params, token){
  var key = [token, params.timestamp, params.nonce].sort().join('');
  var sha1 = require('crypto').createHash('sha1');
  sha1.update(key);
  return  sha1.digest('hex') == params.signature;
}

var server = http.createServer(function (request, response) {
  var query = require('url').parse(request.url).query;
  var params = qs.parse(query);

  if(!checkSignature(params, TOKEN)){
    //如果签名不对，结束请求并返回
    response.end('signature fail');
    return;
  }

  if(request.method == "GET"){
    //如果请求是GET，返回echostr用于通过服务器有效校验
    response.end(params.echostr);
  }else{
    //否则是微信给开发者服务器的POST请求
    var postdata = "";

    request.addListener("data",function(postchunk){
      postdata += postchunk;
    });

    //获取到了POST数据
    request.addListener("end",function(){
      var parseString = require('xml2js').parseString;

      parseString(postdata, function (err, result) {
        if(!err){
          //我们将XML数据通过xml2js模块(npm install xml2js)解析成json格式
          console.log(result);
          response.write(replyText(result));//需要把通过replyText函数处理的result信息写入到返回的
                                            //http相应中去

          response.end('success');
        }
      });
    });

  }
});

function replyText(msg){
  var msgtype = msg.xml.MsgType[0];
  switch(msgtype){
    case  'text':
        feedback = '文本消息';
        break;
    case 'image' :
        feedback = '图片消息';
          break;
    case 'shortvideo' :
        feedback = '小视频';
          break;
    case 'video' :
        feedback = '视频消息';
          break;
    case 'voice' :
        feedback = '语音消息';
        break;
    case 'location' :
        feedback = '位置消息';
          break;
    case 'link':
        feedback = '链接消息';
        break;
    default :
        feedback = '未知类型消息';
}
var tmpl = require ('tmpl');
var replyTmpl = '<xml>'+'<ToUserName><![CDATA[{toUser}]]></ToUserName>'+
                '<FromUserName><![CDATA[{fromUser}]]></FromUserName>'+
                '<CreateTime><![CDATA[{time}]]></CreateTime>'+
                '<MsgType><![CDATA[{type}]]></MsgType>'+
                '<Content><![CDATA[{content}]]></Content>'+
                '</xml>';
return tmpl(replyTmpl,{
  toUser:msg.xml.FromUserName[0],
  fromUser:msg.xml.ToUserName[0],
  type:'text',
  time:Date.now(),
  content:feedback
});



}
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
