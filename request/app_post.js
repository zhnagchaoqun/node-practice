var http = require('http'),
    querystring = require('querystring');
http.createServer(function (req, res) {
  var postData = '';
  // 开始异步接收客户端 post 的数据
  req.addListener('data', function (postDataChuck) {
    postData += postDataChuck;
  });
  // 异步 post 数据接收完成之后执行匿名回调函数
  req.addListener('end', function () {
    // 解析客户端发送的 POST 数据，并将其转化为字符
    var postStr = JSON.stringify(querystring.parse(postData));
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(postStr + '\n' + req.method);
  });
}).listen(1400, '127.0.0.1');
console.log('Server is running at http://127.0.0.1:1400');
