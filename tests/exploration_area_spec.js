describe("Exploration area", function() {
  var ExplorationArea = require("../src/modules/exploration_area");
  var areaSizeMock = { xAxis: 5, yAxis: 3 };
  var area;

  beforeEach(function() {
    area = new ExplorationArea(areaSizeMock);
  });

  it("creates an area object with an x axis", function() {
    expect(area.xAxis).toEqual(5);
  });

  it("reveals out of bounds coordinates", function() {
    expect(area.isOutOfBound(6, 1)).toBeTruthy();
  });

  it("reveals fatal coordinates", function() {
    area.markAsFatal(4, 3, "N");
    area.markAsFatal(4, 3, "N");
    expect(area.moveIsFatal(4, 3, "N")).toBeTruthy();
  });
});
