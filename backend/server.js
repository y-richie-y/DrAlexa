// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// // Broadcast to all.
// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     // Broadcast to everyone else.
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile("./static/index.html", {root: __dirname});
});

var alexa = require('./alexa.js');
app.post('/alexa/voice', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let category = req.body.category;
  let meta = req.body.meta;
    
  res.send(alexa(firstName, lastName, category, meta));
});

app.listen(port);
console.log('RESTful API server started on: ' + port);

// websocket

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
