var Promise = require("bluebird");

/**
 * @name FileReader
 * @desc Simple file reader
 * @param {Element} el The element that will be searched for the file input
 * @param {String} id The id of the file input
 * @returns {Promise}
 */
module.exports = function(el, id) {
  var input = el.getElementById(id);
  var reader = new FileReader();

  if (!input || input.type !== "file") {
    throw new Error("Could not find a valid file input with the id '" + id + "'");
  }

  input.addEventListener("change", function() {
    reader.readAsText(this.files[0]);
  });

  return new Promise(function(resolve, reject) {
    reader.addEventListener("load", function() {
      resolve(reader.result);
    });

    reader.addEventListener("error", function(err) {
      reject(err);
    });
  });
};
