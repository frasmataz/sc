var formatOutput = function(input, dictionary, sym1, sym2) {
  var output = [];

  for (var l = 0; l < input.length; l++) {
    for (var i = 0; i < dictionary[input.charAt(l)].length; i++) {
      if (typeof output[i] == 'undefined')
        output[i] = "";

      for (var j = 0; j < dictionary[input.charAt(l)][1].length; j++) {
        if (dictionary[input.charAt(l)][i][j] == 1) {
          output[i] += sym1;
        } else {
          output[i] += sym2;
        }
      }
    }


    // Hack to remove blank space at the end of output
    if (l == input.length - 1) {
      for (var i = 0; i < output.length; i++) {
        output[i] = output[i].slice(0, sym2.length * -1)
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

exports.get = function(event, context, callback) {
  console.log(event)
  var message = event['message'];
  var sym1 = event['sym1'];
  var sym2 = event['sym2'];
  var dictionary = JSON.parse(readDictionary());

  message = sanitizeMessage(message, dictionary);

  var output = formatOutput(message, dictionary, sym1, sym2);

  // res.setHeader('content-type', 'text/plain');
  // res.status(200).send(output);
  callback(null, output)
};
