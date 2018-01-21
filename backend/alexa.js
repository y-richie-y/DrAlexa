const mongodb = require('mongodb')
const _ = require('lodash')

module.exports = async function query(patientFirstName, patientLastName, category, meta) {
    if (!patientFirstName)
        return {'error': {'required': 'patientFirstName'}};
    if (!patientLastName)
        return {'error': {'required': 'patientLastName'}};
    if (category)
        return {'error': {'required': 'category'}};

    let returnObj = null;
    const db = await mongodb.MongoClient.connect("mongodb://admin:password@10.0.2.27:27017");
    const lib = db.db('db').collection('fhir');
    const patient = await lib.findOne({
        'resource.resourceType': 'Patient', 
        'resource.name.family': patientLastName, 
        'resource.name.given.0': patientFirstName
    });
    
    switch (category) {
        case 'PRESCRIPTIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'MedicationRequest',
                'resource.subject.reference': patient.fullUrl,
            }).toArray();
            returnObj = _.map(arr, element => element.resource.medicationCodeableConcept.coding.text);
            break;
        }
        case 'ALLERGIES': {
            const arr = await lib.find({
                'resource.resourceType': 'AllergyIntolerance',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            returnObj = _.map(arr, element => 
                element.resource.code.criticality + '-criticality, ' + element.resource.code.verificationStatus + ' ' + element.resource.code.coding[0].display);
            break;
        }
        case 'CONDITIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'active',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            returnObj = _.map(arr, element => element.code.text);
            break;
        }
        case 'GOALS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'active',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            const goals = await Promise.all(_.map(arr, lib.findOne({
                'resource.resourceType': 'Goal',
                'resource.addresses.reference': condition.fullUrl
            })));
            returnObj = _.map(goals, element => element.description.text);
            break;
        }
        case 'PAST-CONDITIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'resolved',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            returnObj = _.map(arr, element => element.code.text);
            break;
        }
    }
            
    db.close();
    return returnObj;
}