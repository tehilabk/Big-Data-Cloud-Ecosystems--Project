var bigml = require('bigml');
var connection = new bigml.BigML('TEHILABK123','d8379b7ff213c30f6d894078cc12f543bc9f5844')
var source = new bigml.Source(connection);

source.create('./data/iris.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset();
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model();
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction();
            prediction.create(modelInfo, {'petal length': 1})
          }
        });
      }
    });
  }
});