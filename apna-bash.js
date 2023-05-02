const fs = require('fs');
const {parse} = require('./parser.js');
const {displayPwd, listFiles, changeDirectory} = require('./commands.js');

const methodToExecute = function(command) {
  const instructions = {
    'pwd': displayPwd,
    'ls': listFiles,
    'cd': changeDirectory
  };

  return instructions[command];
};

const execute = function(state, commandLine) {
  const [command, ...args] = commandLine;
  const method = methodToExecute(command);

  if(method === 'undefined') {
    const message = 'file does not exist';
    return {environment: state.environment, log: [...state.log, {command: {'name': command, 'arguments': args}, output: message, exitCode: 1}]};
  }

  const {environment, output, exitCode} = method(state.environment, args);
  console.log(environment);

  return {environment, log: [...state.log, {command: {'name': command, 'arguments': args}, output, exitCode}]}
};

const generateTokens = function(souceCode) {
  return souceCode.trim().split(/\n/);
};

const getCode = function(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
};

const run = function(scriptFile) {
  const sourceCode = getCode(scriptFile);
  const tokens = generateTokens(sourceCode);
  const commandLines = parse(tokens);
  const log = [];
  const environment = {
    pwd: process.env.PWD
  }
  return commandLines.reduce(execute, {environment, log});
};

exports.run = run;
