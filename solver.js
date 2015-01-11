(function() {
  var _ = require('underscore'),
    fs = require('fs');

  fs.readFile("./grid.txt", 'utf-8', function(e, data) {
    if (e) {
      console.log(e);
      return;
    }

    solve(data);
  });

  function solve(data) {
    var grid = processGrid(data);

    if (!validGrid(grid)) {
      console.log("Grid is not valid");
      return;
    }

    console.log(grid);
  }

  function processGrid(grid) {
    if (grid.length === 0) {
      console.log("Grid appears to be empty");
      return;
    }

    return _(grid.split(/\r?\n/)).filter(function(line) {
        return line.length > 0;
      }).map(function(line) {
        return _(line.split(/\s/g)).map(function(cell) {
          return parseInt(cell);
        });
      });
  }

  function validGrid(grid) {
    return _(grid).reduce(function(valid, row) {
        return valid && row.length == grid[0].length;
      }, true);
  }

})();