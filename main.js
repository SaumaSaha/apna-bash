const fs = require('fs');

const {displayPwd, listFiles, changeDirectory} = require('./commands.js');

const operations = {
  'pwd': displayPwd,
  'ls': listFiles,
  'cd': changeDirectory
};

const execute = function(commands, state) {
  return commands.reduce(function(state, command) {
    const [operation, ...args] = command;
    return operations[operation](state, args);
  }, state);
};

const parse = function(tokens) {
  return tokens.map(function(command) {
    return command.split(' ');
  });
};

const display = function(output) {
  console.log(output.join('\n\n'));
}

const main = function() {
  const scriptFile = process.argv[2];
  const tokens = fs.readFileSync(scriptFile, 'utf-8').trim().split(/\n/);
  const env = {pwd: process.env.PWD};
  const output = [];
  const state = {env, output};
  const commands = parse(tokens);
  const newState = execute(commands, state);
  console.log(newState);
  display(newState.output);
};

main();
