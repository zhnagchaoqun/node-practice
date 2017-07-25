var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
// 设置 socket 监听端口为 8080 端口
var io = require('socket.io').listen(server);
server.listen(8080);
// 定义 socket 连接时执行的回调操作
// 当客户端 connection 时， 执行回调函数 function(socket){}
io.sockets.on('connection', function (socket) {
  // 发送消息函数socket.emit 连接成功后发送一个 news 消息，消息内容为 json 对象{ hello: 'world' }
  socket.emit('news', { hello: 'world' });
  // 接收消息函数socket.on 客户端发送 my other event 消息时，服务器端接受该消息， 成功获取该消息后执行回调函数 function(data){}
  socket.on('my other event', function (data) {
    console.log(data);
  });
});