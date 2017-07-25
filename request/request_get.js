var request = require('request');
// 应用 request 方法，获取 http://127.0.0.1:1337 的响应信息
request.get('http://127.0.0.1:1337', function (error, response, result) {
  console.log(result);
});
