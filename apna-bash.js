const fs = require('fs');
const {displayPwd, listFiles, changeDirectory} = require('./commands.js');

const methodToExecute = function(command) {
  const instructions = {
    'pwd': displayPwd,
    'ls': listFiles,
    'cd': changeDirectory
  };

  return instructions[command];
};

const execute = function({env, log}, commandLine) {
  const [command, ...args] = commandLine;
  const method = methodToExecute(command);

  if(method === 'undefined') {
    const message = 'file does not exist';
    return {env, log: [...log, {command: {'name': command, 'arguments': args}, output: message, exitCode: 1}]};
  }
  const {pwd, output, exitCode} = method(env.pwd, args);

  return {env: {pwd}, log: [...log, {command: {'name': command, 'arguments': args}, output, exitCode}]}
};

const generateTokens = function(souceCode) {
  return souceCode.trim().split(/\n/);
};

const getCode = function(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
};

const parse = function(tokens) {
  return tokens.map(function(token) {
    return token.split(' ');
  });
};

const run = function(scriptFile) {
  const sourceCode = getCode(scriptFile);
  const tokens = generateTokens(sourceCode);
  const commandLines = parse(tokens);
  const log = [];
  const env = {
    pwd: process.env.PWD
  }
  return commandLines.reduce(execute, {env, log});
};

exports.run = run;
