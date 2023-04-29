const parse = function(tokens) {
  return tokens.map(function(command) {
    return command.split(' ');
  });
};

exports.parse = parse;
