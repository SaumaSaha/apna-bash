const fs = require('fs');

const resolvedComponents = function(normalizePathComponents, component) {
  const components = [...normalizePathComponents];
  if(component === '..') {
    components.pop();
  }
  if((/\w/).test(component)) {
    components.push(component);
  }

  return components;
}

const normalizePath = function(path, pwd) {
  const pathComponents = path.split('/');
  let normalizePathComponents = pwd.split('/');
  for(const component of pathComponents) {
    normalizePathComponents = resolvedComponents(normalizePathComponents, component);
  }

  return normalizePathComponents.join('/');
};

const displayPwd = function(env) {
  const output = env.pwd;
  return {environment: {pwd: env.pwd}, output, exitCode: 0};
};

const listFiles = function(env) {
  console.log(env);
  const filesList = fs.readdirSync(env.pwd).join(' ');
  return {environment: {pwd: env.pwd}, output: filesList, exitCode: 0};
};

const changeDirectory = function(env, directoryPath) {
  let newPwd = env.pwd;
  newPwd = directoryPath.toString().startsWith('/') ? directoryPath : newPwd + `/${directoryPath}`;

  if(!fs.existsSync(newPwd)) {
    return {environment: {pwd: env.pwd}, output: 'cd : no such file or directory', exitCode: 1};
  }

  newPwd = normalizePath(directoryPath.toString(), env.pwd);
  return {environment: {pwd: newPwd}, exitCode: 0};
};

exports.displayPwd = displayPwd;
exports.listFiles = listFiles;
exports.changeDirectory = changeDirectory;
