describe("Robot", function() {
  var ExplorationArea = require("../src/modules/exploration_area");
  var Robot = require("../src/modules/robot.js");
  var missionMock = {
    id: 0,
    start: { x: 3, y: 2, facing: "N" },
    instructions: "FRRFLLFFRRFLL".split("")
  };
  var resultsMock = { x: 3, y: 3, facing: "N", lost: true };
  var areaMock = new ExplorationArea({ xAxis: 5, yAxis: 3 });
  var robot;

  beforeEach(function() {
    robot = new Robot(missionMock.id);
  });

  describe("given deploy coordinates", function() {
    it("deploys", function() {
      robot.deploy(areaMock, missionMock.start);
      expect(robot.x).toEqual(missionMock.start.x);
    });

    it("is lost if deployed outside of the area", function() {
      var failedDeploy = { x: 3, y: 4, facing: "N" };
      robot.deploy(areaMock, failedDeploy);
      expect(robot.lost).toBeTruthy();
    });
  });

  describe("when deployed", function() {
    beforeEach(function() {
      areaMock = new ExplorationArea({ xAxis: 5, yAxis: 3 });
      robot.deploy(areaMock, missionMock.start);
    });

    it("explores and returns correct results", function() {
      robot.explore(missionMock.instructions);
      expect(robot.results()).toEqual(resultsMock);
    });

    it("can move forward", function() {
      robot.moveForward();
      expect(robot.y).toEqual(3);
    });

    it("can turn left", function() {
      robot.turn("L");
      expect(robot.facing).toEqual("W");
    });

    it("can turn right", function() {
      robot.turn("R");
      expect(robot.facing).toEqual("E");
    });

    it("can turn 360", function() {
      for (var i = 0; i < 4; i++)  robot.turn("R");
      expect(robot.facing).toEqual("N");
    });

    it("does not move into a fatal area", function() {
      areaMock.markAsFatal(3, 2, "N");
      robot.moveForward();
      expect(robot.y).toEqual(missionMock.start.y);
    });

    it("marks last coords as fatal when lost", function() {
      var fatalCoord = {
        x: missionMock.start.x,
        y: missionMock.start.y + 1,
        facing: missionMock.start.facing
      };
      for (var i = 0; i < 2; i++)  robot.moveForward();
      expect(areaMock.fatalCooridinates).toEqual([ fatalCoord ]);
    });
  });
});
