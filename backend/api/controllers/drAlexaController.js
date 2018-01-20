'use strict';

// name, prescription, allergy, condition, insurance, family history

exports.get_attr = function(req, res) {
    res.send(req.params);
}

exports.get_history = function(req, res) {
    res.send(req.query);
}

exports.get_alexa_response = (req, res) => {
    let patient = req.body.patient;
    let organisation = req.body.organisation;
    let category = req.body.category;
    let meta = req.body.meta;

    switch (category) {
        case "prescription":
        break;
        case "allergy":
        break;
        case "condition":
        break;
        case "insurance":
        break;
        case "familyhistory":
        break;
    }

    res.send(req.body);

}