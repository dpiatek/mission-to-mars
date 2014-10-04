var _ = require('lodash');
var FACES = ['N', 'E', 'S', 'W'];

module.exports = Robot;

/**
 * @name Robot
 * @constructor
 */
function Robot(id) {
  this.id = id;
  this.lost = false;
  this.result = null;
}

Robot.prototype.deploy = deploy;
Robot.prototype.explore = explore;
Robot.prototype.turn = turn;
Robot.prototype.moveForward = moveForward;
Robot.prototype.results = results;

function deploy(area, startCoord) {
  this.area = area;
  this.x = startCoord.x;
  this.y = startCoord.y;
  this.facing = startCoord.facing;

  if (area.isOutOfBound(this.x, this.y)) {
    this.lost = true;
  }
}

function explore(instructions) {
  for (var i = 0; i < instructions.length; i++) {
    if (this.lost) {
      break;
    }

    if (/[RL]/.test(instructions[i])) {
      this.turn(instructions[i]);
      continue;
    }

    if (instructions[i] === 'F') {
      this.moveForward();
    }
  }
}

function turn(direction) {
  var currentDirectionIndex = _.indexOf(FACES, this.facing);
  var newDirectionIndex = (direction === 'R') ? currentDirectionIndex + 1 : currentDirectionIndex - 1;
  if (newDirectionIndex === FACES.length) newDirectionIndex = newDirectionIndex - FACES.length;
  if (newDirectionIndex < 0) newDirectionIndex = newDirectionIndex + FACES.length;
  this.facing = FACES[newDirectionIndex];
}

function moveForward() {
  var newCoord = { x: this.x, y: this.y };

  switch (this.facing) {
    case 'N':
      ++newCoord.y;
      break;
    case 'W':
      --newCoord.x;
      break;
    case 'S':
      --newCoord.y;
      break;
    case 'E':
      ++newCoord.x;
      break;
  }

  if (this.area.moveIsFatal(this.x, this.y, this.facing)) {
    return;
  }

  if (this.area.isOutOfBound(newCoord.x, newCoord.y)) {
    this.lost = true;
    this.area.markAsFatal(this.x, this.y, this.facing);
    return;
  }

  this.x = newCoord.x;
  this.y = newCoord.y;
}

function results() {
  return {
    x: this.x,
    y: this.y,
    facing: this.facing,
    lost: this.lost
  };
}
