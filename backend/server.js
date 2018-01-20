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


var routes = require('./api/routes/drAlexaRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

