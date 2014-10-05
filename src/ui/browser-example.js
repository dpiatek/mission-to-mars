var fileInput = require('./browser/file_reader');

var resultsFormatter = require('../modules/results_formatter');
var instructionsParser = require('../modules/instructions_parser');
var ExplorationArea = require('../modules/exploration_area');
var Robot = require('../modules/robot');

/*
 * Example usage in a browser
 */
fileInput(document, 'input', function(input) {
  var instructions = instructionsParser(input);

  document
    .getElementById('input-data')
    .textContent = input;

  var area = new ExplorationArea(instructions.areaSize);

  var results = instructions.robots.map(function(mission) {
    var robot = new Robot(mission.id);
    robot.deploy(area, mission.start);
    robot.explore(mission.instructions);
    return robot.results();
  });

  document
    .getElementById('output-data')
    .textContent = resultsFormatter(results);
});
