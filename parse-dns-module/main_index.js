var url = require('url'),
    fs = require('fs');
function goIndex(res, req) {
  // 获取当前 index.html 的路径
  var readPath = __dirname + '/' + url.parse('index.html').pathname;
  // 读取文件数据
  var indexPage =  fs.readFileSync(readPath);
  // 执行 HTTP 响应返回到 Web 客户端
  res.end(indexPage);
}
module.exports = goIndex;
