describe("File reader", function() {
  var fileReader = require("../../../src/ui/browser/file_reader");

  var fragment;

  beforeEach(function(){
    fragment = setupDocumentFragment();
  });

  it("throws if an input is not found", function() {
    expect(fileReader.bind(null, fragment, "bar")).toThrow();
  });

  function setupDocumentFragment() {
    var el = document.createDocumentFragment();
    var input = document.createElement("input");
    input.type = "file";
    input.id = "foo";
    el.appendChild(input);
    return el;
  }
});
