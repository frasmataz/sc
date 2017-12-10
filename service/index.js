var formatOutput = function(input, dictionary, sym1, sym2) {
  var output = "";
  for (var i = 0; i < 5; i++) {
    for (var l = 0; l < input.length; l++) {
      for (var j = 1; j < 5; j++) {
        if (dictionary[input.charAt(l)][i][j] == 'True') {
          output += sym1;
        } else {
          output += sym2;
        }
      }
    }
    output += '\n';
  }

  return output;
};

var readDictionary = function() {
  filename = 'dictionary.json';
  var fs = require('fs');
  var file = fs.readFileSync(filename, 'utf8');
  return file;
};

var sanitizeMessage = function(message, dictionary) {
  var letters = Object.keys(dictionary);
  var output = "";

  message = message.toUpperCase();

  for (var i = 0; i < message.length; i++) {
    if (letters.indexOf(message.charAt(i)) != -1) {
      output += message.charAt(i);
    }
  }

  return output;
};

exports.get = function get(req, res) {
  console.log(req.query);
  var message = req.query.message;
  var sym1 = req.query.sym1;
  var sym2 = req.query.sym2;
  var dictionary = JSON.parse(readDictionary());

  message = sanitizeMessage(message, dictionary);

  var output = formatOutput(message, dictionary, sym1, sym2);

  res.setHeader('content-type', 'text/plain');
  res.status(200).send(output);
};
