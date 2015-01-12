module.exports = (function() {
  var _ = require('underscore');

  function reduce_to_words (wordlist, letter) {
    var index = wordlist.length === 0 ? 0 : wordlist.length - 1;
    if (!isNaN(letter)) {
      if (typeof wordlist[index] == "undefined") {
        wordlist[index] = [];
      }
      wordlist[index].push(letter);
    } else {
      wordlist.push([]);
    }
    return wordlist;
  }

  function find_words_in_row(row) {
    return _.chain(row).reduce(reduce_to_words, []).filter(function(word) {
      return word.length > 1;
    }).value();
  }

  function is_multiletter_word(word) {
    return word.length > 0;
  }

  function find_words_in_rows(rows) {
    return _.chain(rows).map(find_words_in_row).filter(is_multiletter_word).flatten(true).value();
  }

  return {
    find_words: find_words_in_rows
  }
})();
