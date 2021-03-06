var _ = require('lodash');

/**
 * @name Exploration Area
 * @constructor
 * @desc Area given by instructions to explore
 * @param {Object} areaSize Bounds for the area
 * @returns {Object}
 */

module.exports = ExplorationArea;

function ExplorationArea(areaSize) {
  this.xAxis = areaSize.xAxis;
  this.yAxis = areaSize.yAxis;
  this.fatalCooridinates = [];
}

ExplorationArea.prototype.isOutOfBound = isOutOfBound;
ExplorationArea.prototype.markAsFatal = markAsFatal;
ExplorationArea.prototype.moveIsFatal = moveIsFatal;

function isOutOfBound(x, y) {
  return x > this.xAxis || y > this.yAxis;
}

function markAsFatal(x, y, face) {
  var coord = { x: x, y: y, facing: face };
  return hasObject(this.fatalCooridinates, coord) || this.fatalCooridinates.push(coord);
}

function moveIsFatal(x, y, face) {
  return hasObject(this.fatalCooridinates, { x: x, y: y, facing: face });
}

function hasObject(collection, obj) {
  return _.where(collection, obj).length > 0;
}
