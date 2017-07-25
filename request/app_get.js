var http = require('http');
// 创建 http 服务器
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('Hello world\n' + req.method);
}).listen(1337, '127.0.0.1');
console.log('Server is running at http://127.0.0.1:1337/');
