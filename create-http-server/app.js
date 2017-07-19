/**
 * Node.js base server
 */
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello world\n');
}).listen(3000, function () {
  console.log('server running at localhost://3000');
});