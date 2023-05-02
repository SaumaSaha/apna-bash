const parse = function(tokens) {
  return tokens.map(function(token) {
    return token.split(' ');
  });
};

exports.parse = parse;
