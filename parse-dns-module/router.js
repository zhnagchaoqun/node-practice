var parseDns = require('./parse_dns.js'),
    goIndex = require('./main_index.js');

// 创建路由模块，并将该模块暴露给外部接口
var router = function (res, req, pathname) {
  switch (pathname) {
    case '/parse':
      parseDns(res, req);
    break;
    default:
      goIndex(res, req);
  }
};
module.exports = router;