const mongodb = require('mongodb')
const _ = require('lodash')

module.exports = async function query(patientFirstName, patientLastName, category, meta) {
    if (!patientFirstName)
        return {'error': {'required': 'patientFirstName'}};
    if (!patientLastName)
        return {'error': {'required': 'patientLastName'}};
    if (!category)
        return {'error': {'required': 'category'}};

    let returnObj = null;
    const db = await mongodb.MongoClient.connect("mongodb://admin:password@10.0.2.27:27017");
    const lib = db.db('db').collection('fhir');
    const patient = await lib.findOne({
        'resource.resourceType': 'Patient', 
        'resource.firstName': patientFirstName,
        'resource.lastName': patientLastName,
    });
    
    switch (category) {
        case 'PRESCRIPTIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'MedicationRequest',
                'resource.subject.reference': patient.fullUrl,
            }).toArray();
            returnObj = _.map(arr, element => element.resource.medicationCodeableConcept.text);
            break;
        }
        case 'ALLERGIES': {
            const criticality = meta.criticality ? {'resource.criticality': meta.criticality} : {};
            const arr = await lib.find({
                'resource.resourceType': 'AllergyIntolerance',
                'resource.patient.reference': patient.fullUrl,
                ...criticality
            }).toArray();
            returnObj = _.map(arr, element => 
                element.resource.verificationStatus + ' ' + element.resource.code.coding[0].display);
            break;
        }
        case 'CONDITIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'active',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            returnObj = _.map(arr, element => element.resource.code.text);
            break;
        }
        case 'GOALS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'active',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            const goals = await Promise.all(_.map(arr, condition => lib.findOne({
                'resource.resourceType': 'Goal',
                'resource.addresses.reference': condition.fullUrl
            })));
            const realGoals = _.filter(goals, element => element);
            
            returnObj = _.map(realGoals, element => element.resource.description.text);
            break;
        }
        case 'PAST-CONDITIONS': {
            const arr = await lib.find({
                'resource.resourceType': 'Condition',
                'resource.clinicalStatus': 'resolved',
                'resource.subject.reference': patient.fullUrl
            }).toArray();
            returnObj = _.map(arr, element => element.resource.code.text);
            break;
        }
    }
            
    db.close();
    return returnObj;
}