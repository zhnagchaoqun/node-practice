var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
// 应用 HTTP 的createServer 方法创建服务器
http.createServer(function (req, res) {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.write('received upload:\n');
      res.end(util.inspect({ fields: fields, files: files }));
    });
    return;
  }
  res.writeHead(200, { 'Content-type': 'text/html' });
  // HTTP 响应 html 信息
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
      '<input type="text" name="title"/><br/>' +
      '<input type="file" name="upload" multiple="multiple"/><br/>' +
      '<input type="submit" value="Upload"/>' +
      '</form>'
  );
}).listen(8080);
