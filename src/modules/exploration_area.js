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
ExplorationArea.prototype.isFatal = isFatal;

function isOutOfBound(x, y) {
  return x > this.xAxis || y > this.yAxis;
}

function markAsFatal(x, y) {
  var coord = { x: x, y: y };
  return _.contains(this.fatalCooridinates, coord) || this.fatalCooridinates.push(coord);
}

function isFatal(x, y) {
  return _.find(this.fatalCooridinates, { x: x, y: y });
}
