describe("Robot", function() {
  var ExplorationArea = require("../src/modules/exploration_area");
  var Robot = require("../src/modules/robot.js");
  var missionMock = {
    id: 0,
    start: { x: 1, y: 1, facing: "E" },
    instructions: "RFRFRFRF".split("")
  };
  var resultsMock = { x: 1, y: 1, facing: "E", lost: false };
  var areaMock = new ExplorationArea({ xAxis: 5, yAxis: 3 });

  describe("given instructions", function() {
    it("deploys", function() {
      var robot = new Robot(missionMock.id);
      robot.deploy(areaMock, missionMock.start);
      expect(robot.x).toEqual(missionMock.start.x);
    });

    it("is lost if deployed outside of the area", function() {
      var robot = new Robot(missionMock.id);
      var failedDeploy = { x: 3, y: 4, facing: "N" };
      robot.deploy(areaMock, failedDeploy);
      expect(robot.x).toEqual(missionMock.start.x);
    });

    it("executes and returns results", function() {
      var robot = new Robot(missionMock.id);
      robot.deploy(areaMock, missionMock.start);
      robot.explore(missionMock.instructions);
      expect(robot.result).toEqual(resultsMock);
    });
  });
});
