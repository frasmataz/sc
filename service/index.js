var formatOutput = function(input, dictionary, sym1, sym2) {
  var output = [];

  for (var l = 0; l < input.length; l++) {
    for (var i = 0; i < dictionary[input.charAt(l)].length; i++) {
      if (typeof output[i] == 'undefined')
        output[i] = "";

      for (var j = 0; j < dictionary[input.charAt(l)][1].length; j++) {
        if (dictionary[input.charAt(l)][i][j] == 'True') {
          output[i] += sym1;
        } else {
          output[i] += sym2;
        }
      }
    }
  }

  var outputStr = "";
  for (var i in output) {
    outputStr += output[i];
    outputStr += '\n';
  }

  return outputStr;
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
