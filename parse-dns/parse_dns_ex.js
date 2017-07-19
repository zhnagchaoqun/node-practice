var http = require('http'),
    dns = require('dns'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

http.createServer(function (req, res) {
  // 获取当前请求资源的 url 路径, 例如"/parse"
  var pathname = url.parse(req.url).pathname;
  // 设置返回客户端页面的数据格式, 这里设置为 utf8 ,如果不设置可能会出现乱码情况
  req.setEncoding('utf8');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // 调用 router 方法来处理路由
  router(res, req, pathname);
}).listen(3000, function () {
  console.log('server is listening on port 3000');
});

function router(res, req, pathname) {
  switch (pathname) {
    case '/parse':
      parseDns(req, res);
    break;
    default:
      goIndex(res, req);
  }
}
function goIndex(res, req) {
  // 获取当前 index.html 的路径
  var readPath = __dirname + '/' + url.parse('index.html').pathname;
  // 读取文件数据
  var indexPage =  fs.readFileSync(readPath);
  // 执行 HTTP 响应返回到 Web 客户端
  res.end(indexPage);
}
function parseDns(req, res) {
  var postData = '';
  req.addListener('data', function (postDataChuck) {
    postData += postDataChuck;
  });
  // HTTP 响应 html 页面信息
  req.addListener('end', function () {
    // domain 是传递的域名参数， address 是解析后返回的 IP 地址列表
    var retData = getDns(postData, function (domain, address) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><head><meta http-equiv="content-type" content="text/html" charset="utf-8"></head>' +
        '<div style="text-align: center">Domain: <span style="color: red">' + domain + '</span>' + '<br/>' +
        'IP: <span style="color: red">' + address.join(',') + '</span>' +
        '</div>' +
        '</html>')
    });
  });
}
function getDns(postData, callback) {
  var domain = querystring.parse(postData).search_dns;
  // 异步解析域名
  dns.resolve(domain, function (err, addresses) {
    if (!addresses) {
      addresses = ['不存在域名'];
    }
    callback(domain, addresses);
  });
}

