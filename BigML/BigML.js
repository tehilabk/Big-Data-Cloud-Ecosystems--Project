var bigml = require('bigml');
var connection = new bigml.BigML('TEHILABK123','d8379b7ff213c30f6d894078cc12f543bc9f5844')
var source = new bigml.Source(connection);


source.create('../BigML/items.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset();
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model();
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction();
            prediction.create(modelInfo, {'length': 1})
          }
        });
      }
    });
  }
});

 // Downloads and generates a local version of the ASSOCIATION.
 var association = new bigml.LocalAssociation(
     'association/616d3c48e4279b24a2013597', new bigml.BigML("tehilabk123", "d8379b7ff213c30f6d894078cc12f543bc9f5844", {"domain": "bigml.io"}));
 // To predict predict association sets fill the desired inputData
 // inputData: input values' object.
 var inputData = {
         
     };
 association.associationSet(inputData, function (error, data) {
     console.log(data)
 });