var util = require("util");

/**
 * @name Instructions Parser
 * @desc Parse input and create an Instructions instance.
 * @param {String} string input
 * @returns {Object}
 */
module.exports = function instructionParser(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Could not parse input.");
  }

  var firstNewLineIndex = input.indexOf("\n");
  var firstLine = input.slice(0, firstNewLineIndex).split(" ");
  var rest = input.slice(firstNewLineIndex);

  var robotInstructions = rest.split("\n\n");

  var areaSize = {
    xAxis: Number(firstLine[0]),
    yAxis: Number(firstLine[1])
  };

  if (areaSize.xAxis < 1 || areaSize.yAxis < 1) {
    throw new Error("Area size is invalid.");
  }

  var robots = robotInstructions.map(function(val, index) {
    var values = val.split("\n");
    // [0] is just a newline
    var startPosition = values[1].split(" ");
    var x = Number(startPosition[0]);
    var y = Number(startPosition[1]);
    var facing = startPosition[2];
    var instructions = values[2].split("");

    if (isNaN(x) || isNaN(y)) {
      throw new Error("Robot " + index + " start position is invalid.");
    }

    if (facing.length > 0 && !/[NSWE]/.test(facing)) {
      throw new Error("Robot " + index + " facing direction is invalid.");
    }

    if (instructions.length > 0 && !/[NSWEF]/.test(instructions)) {
      throw new Error("Robot " + index + " instructions are invalid.");
    }

    return {
      id: index,
      start: { x: x, y: y, facing: facing },
      instructions: instructions
    };
  });

  return {
    areaSize: areaSize,
    robots: robots
  };
};
