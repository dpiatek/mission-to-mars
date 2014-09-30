var fileInput = require('./modules/file_reader');

fileInput(document, 'input')
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.error(err);
  });
