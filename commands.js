const fs = require('fs');

const normalizePath = function(path) {
  const pathTokens = path.split('/');
  const normalizePathTokens = [];
  for(const token of pathTokens) {
    if(token === '..') {
      normalizePathTokens.pop();
    }
    else if(token !== '.') {
      normalizePathTokens.push(token);
    }
  }

  return normalizePathTokens.join('/');
};

const displayPwd = function(state) {
  state.output.push(state.env.pwd);
  return state;
};

const listFiles = function(state) {
  const filesList = fs.readdirSync(state.env.pwd).join(' ');
  state.output.push(filesList);
  return state;
};

const changeDirectory = function(state, directoryPath) {
  let pwd = state.env.pwd;
  pwd = directoryPath.toString().startsWith('/') ? directoryPath : pwd + `/${directoryPath}`;

  if(!fs.existsSync(pwd)) {
    console.log('cd : no such file or directory : ', directoryPath);
    process.exit(1);
  }

  pwd = normalizePath(pwd);
  state.env.pwd = pwd;
  return state;
};

exports.displayPwd = displayPwd;
exports.listFiles = listFiles;
exports.changeDirectory = changeDirectory;
