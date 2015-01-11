module.exports = (function() {
  var fs = require('fs'),
    nodehun = require('nodehun'),
    affbuf,
    dictbuf,
    dict,
    API = {};

  API.check = function(word, callback) {
    dict.spellSuggestions(word, callback);
  }


  return function Spellcheck(aff, dict) {
    affbuf = fs.readFileSync(aff);
    dictbuf = fs.readFileSync(dict);
    dict = new nodehun(affbuf, dictbuf);

    return API;
  };

})();
