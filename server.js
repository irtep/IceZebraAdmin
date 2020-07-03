const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const port = 6970;

app.use(express.static('UI'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log('contact from: ', req.connection.remoteAddress);
  console.log('/: ', req.headers['x-forwarded-for']);
});

// listen from www
http.listen(port, () => {
  console.log('listening on *:' + port);
});
