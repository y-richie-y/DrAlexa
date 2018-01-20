'use strict';

// name, prescription, allergy, condition, insurance, family history

exports.get_attr = function(req, res) {
    res.send(req.params);
    // res.send("SENDING HISTORY");
}

exports.get_history = function(req, res) {
    res.send(req.query);
    // res.send("SENDING HISTORY");
}