var request = require('request');
request.post('http://127.0.0.1:1400', { form: { 'name': 'xiaobai', 'book': 'node.js' }}, function (error, response, result) {
  console.log(result);
});
