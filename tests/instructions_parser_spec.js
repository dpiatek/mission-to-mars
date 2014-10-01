describe("Instructions Parser", function() {
  var instructionsParser = require("../src/modules/instructions_parser.js");

  var input = [
    "5 3",
    "1 1 E",
    "RFRFRFRF",
    "\n",
    "3 2 N",
    "FRRFLLFFRRFLL"
  ].join("\n");
  var areaSizeMock = { xAxis: 5, yAxis: 3 };
  var robotsMock = [
    {
      id: 0,
      start: { x: 1, y: 1, facing: "E" },
      instructions: "RFRFRFRF".split("")
    },
    {
      id: 1,
      start: { x: 3, y: 2, facing: "N" },
      instructions: "FRRFLLFFRRFLL".split("")
    }
  ];

  describe("when given well formed instructions", function() {
    it("creates an area object when given well formed instructions", function() {
      var parsedInstructions = instructionsParser(input);
      expect(parsedInstructions.areaSize).toEqual(areaSizeMock);
    });

    it("creates a robot object", function() {
      var parsedInstructions = instructionsParser(input);
      expect(parsedInstructions.robots[1]).toEqual(robotsMock[1]);
    });
  });

  describe("when given invalid input", function() {
    it("returns an empty object if data could not be parsed", function() {
      expect(instructionsParser.bind(null, [])).toThrow();
    });
  });
});
