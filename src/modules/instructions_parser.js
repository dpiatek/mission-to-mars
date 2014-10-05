var _ = require("lodash");

/**
 * @name Instructions Parser
 * @desc Parse input and create an Instructions instance.
 * @param {String} string input
 * @returns {Object}
 */
module.exports = function instructionParser(input) {
  validateInput(input);

  var firstNewLineIndex = input.indexOf("\n");
  var firstLine = input.slice(0, firstNewLineIndex).split(" ");
  var rest = input.slice(firstNewLineIndex);

  var robotInstructions = rest.split("\n\n");

  var areaSize = {
    xAxis: Number(firstLine[0]),
    yAxis: Number(firstLine[1])
  };

  var robots = _.map(robotInstructions, function(val, index) {
    var values = val.trim().split("\n");
    var startPosition = values[0].split(" ");
    var x = Number(startPosition[0]);
    var y = Number(startPosition[1]);
    var facing = startPosition[2];
    var instructions = values[1].split("");

    return {
      id: index,
      start: { x: x, y: y, facing: facing },
      instructions: instructions
    };
  });

  return {
    areaSize: validateAreaSize(areaSize),
    robots: validateRobots(robots)
  };
};

function validateInput(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Could not parse input.");
  }

  return input;
}

function validateAreaSize(areaSize) {
  if (areaSize.xAxis < 1 || areaSize.yAxis < 1) {
    throw new Error("Area size is invalid.");
  }

  return areaSize;
}

function validateRobots(robots) {
  _.forEach(robots, function(robot, index) {
    var x = robot.start.x, y = robot.start.y;
    var facing = robot.start.facing, instructions = robot.instructions;

    if (isNaN(x) || isNaN(y)) {
      throw new Error("Robot " + index + " start position is invalid.");
    }

    if (facing.length > 0 && !/[NSWE]/.test(facing)) {
      throw new Error("Robot " + index + " facing direction is invalid.");
    }

    if (instructions.length > 0 && !/[RLF]/.test(instructions)) {
      throw new Error("Robot " + index + " instructions are invalid.");
    }
  });

  return robots;
}
