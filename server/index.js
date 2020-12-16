var express = require('express');
const { truncate } = require('fs');
var { createProxyMiddleware } = require('http-proxy-middleware');
var path = require('path');
var port = 8000;
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/reviews', createProxyMiddleware({
  target: 'http://localhost:3003/',
  changeOrigin: true
}))


app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}!`)
})