var bigml = require('bigml');
var fs = require('fs');
var connection = new bigml.BigML('tehilabk123', 'd8379b7ff213c30f6d894078cc12f543bc9f5844')
var source = new bigml.Source(connection);
var ok;

module.exports = async function bigml_connect(callback) {
  try {
    //take the csv file
    ok = await source.create('../BigML/items.csv', function (error, sourceInfo) {
      if (!error && sourceInfo) {
        // create dataset
        var dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, function (error, datasetInfo) {
          if (!error && datasetInfo) {
            // create association
            var model = new bigml.Association(connection);
            model.create(datasetInfo, function (error, modelInfo) {
              if (!error && modelInfo) {
                // console.log(modelInfo)
                try {
                  var model = new bigml.Model(connection);
                  model.get(modelInfo.resource,
                    true,
                    'only_model=true;limit=-1',
                   async function (error, resource) {
                      if (!error && resource) {
                        fs.writeFileSync('../BigML/dataset.json', JSON.stringify(resource, null, "  "));
                      }
                    });
                }
                catch (err) {
                  console.log(err);
                }
                finally {
                  return 1;
                }
              }
            });
          }
        });
      }
    });
  }
  catch (err) {
    console.log(err);
  }
  finally {
    console.log("create a json from bigml")
    callback();
    return 1
  }
}