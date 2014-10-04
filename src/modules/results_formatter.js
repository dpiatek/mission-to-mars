var _ = require("lodash");

/**
 * @name resultsFormatter
 * @desc Stringifies the robot results data
 * @param {Array} collection A collection of Robot result data
 * @returns {String}
 */
module.exports = function(collection) {
  var output = [];

  _.forEach(collection, function(value) {
    var line = [
      value.x,
      value.y,
      value.facing
    ].join(" ");

    if (value.lost) line += " LOST";

    output.push(line);
  });

  return output.join("\n");
};
