var http = require('http'),
    url = require('url');
var router = require('./router.js');

// 创建 http 服务器
http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  // 设置 HTTP 返回字符串编码，不设置可能会出现乱码
  req.setEncoding('utf8');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  router(res, req, pathname);
}).listen(3000, function () {
  console.log('server is listening on port 3000');
});
