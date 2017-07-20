// dns 解析模块
var querystring = require ('querystring'),
    dns = require('dns');

var parseDns = function (res, req) {
  var postData = '';
  req.addListener('data', function (postDataChunck) {
    postData += postDataChunck;
  });
  req.addListener('end', function () {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var retData = getDns(postData, function (domain, address) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><head><meta http-equiv="content-type" content="text/html" charset="utf-8"></head>' +
        '<div style="text-align: center">Domain: <span style="color: red">' + domain + '</span>' + '<br/>' +
        'IP: <span style="color: red">' + address.join(',') + '</span>' +
        '</div>' +
        '</html>')
    });
  });
  return;
};
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
module.exports = parseDns;
