(function() {
  var _ = require('underscore'),
    fs = require('fs'),
    args = process.argv.slice(2),
    spellcheck = require('./lib/spellcheck.js')('./dict/en_GB.aff', './dict/en_GB.dic'),
    wordfinder = require('./lib/wordfinder.js');


  if (args.length !== 1) {
    console.log("Usage: node solver.js grid_file.txt");
  }

  fs.readFile(args[0], 'utf-8', function(e, data) {
    if (e) {
      console.log(e);
      return;
    }

    solve(data);
  });

  function frequency_analysis(arr) {
    return _(arr).reduce(function(acc, letter) {
      if (!isNaN(letter)) {
        if (typeof acc[letter] == "undefined") {
          acc[letter] = 0;
        }
        acc[letter] ++;
      }
      return acc;
    }, {});
  }


  function solve(data) {
    var grid = processGrid(data),
      letter_frequency,
      words;

    if (!validGrid(grid)) {
      console.log("Grid is not valid (check that each row has the same number of cells");
      return;
    }

    letter_frequency = frequency_analysis(_(grid).flatten());
    words = wordfinder.find_words(grid);
    
    console.log(words);
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
