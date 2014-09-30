describe("File reader", function() {
  var Promise = require("bluebird");
  var fileReader = require("../src/modules/file_reader");

  var el;

  function setupDocumentFragment() {
    var el = document.createDocumentFragment();
    var input = document.createElement("input");
    input.type = "file";
    input.id = "foo";
    el.appendChild(input);
    return el;
  }

  beforeEach(function() {
    setupDocumentFragment();
  });

  it("returns a promise", function() {
    var promise = fileReader(el, "foo");
    expect(promise instanceof Promise).toBeTruthy();
  });

  it("throws if an input is not found", function() {
    expect(fileReader.bind(null, el, "bar")).toThrow();
  });
});
