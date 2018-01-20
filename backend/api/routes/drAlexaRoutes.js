'use strict';
module.exports = function(app) {
  var controller = require('../controllers/drAlexaController');

  // todoList Routes
  app.route('/get/:attr')
    .get(controller.get_attr);

  app.route('/get/history')
    .get(controller.get_history);
};