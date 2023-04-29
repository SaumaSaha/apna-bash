const {run} = require('./apna-bash.js');
const {displayPwd, listFiles, changeDirectory} = require('./commands.js');

const display = function(output) {
  console.log(output);
};

const main = function() {
  const scriptFile = process.argv[2];
  const output = run(scriptFile);
  display(output);
};

main();
