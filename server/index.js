const express = require('express');
const { truncate } = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const port = 8000;
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('newrelic');


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