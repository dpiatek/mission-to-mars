var fileInput = require('./modules/file_reader');

fileInput(document, 'input', function(instructions) {
  console.log(instructions);
});
