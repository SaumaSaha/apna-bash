const scriptFile = process.argv[2];
const fs = require('fs');

const commands = fs.readFileSync(scriptFile, 'utf-8').trim().split(/\n/);

const pwd = function() {
  return process.env.PWD;
};

const ls = function() {
  return fs.readdirSync(process.env.PWD).join(' ');
};

const cd = function(directoryPath) {
  process.env.PWD += `/${directoryPath}`;
};

const extractPath = function(command) {
  return command.split(" ")[1];
}

const operations = {pwd, ls, cd};

const runCommands = function(commands) {
  const output = [];

  for(const command of commands) {
    if(/^cd /.test(command)) {
      const directoryPath = extractPath(command);
      operations.cd(directoryPath);
    } else {
      output.push(operations[command]());
    }
  }

  return output.join('\n\n');
};

const display = function(text) {
  console.log(text);
};

const main = function() {
  display(runCommands(commands));
};

main();
