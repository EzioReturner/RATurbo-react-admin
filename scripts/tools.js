const fs = require('fs');
const path = require('path');

function getTemplate(fileName) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  return `import React, { Component } from 'react'; \n` +
    '\n' +
    `class ${upperName} extends Component { \n` +
    '\n' +
    '} \n' +
    '\n' +
    `export default ${upperName};`
}

async function createFile(createType, fileName) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const _path = path.resolve(__dirname, `../src/${createType}/${upperName}`);
  fs.exists(_path, async function(exists) { 
    if (exists) {
      throw Error('file path was existed');
    } else {
      await fs.mkdir(_path, () => { }); 
      await fs.writeFileSync(`${_path}/index.jsx`, getTemplate(fileName));
      await fs.writeFileSync(`${_path}/index.scss`, '');
      console.log(`${fileName} component created`);
    }
  })
}
  
  
;(async () => {
  const config_argv = JSON.parse(process.env.npm_config_argv);
  const [actionName, fileName] = config_argv.original;
  const [, createType] = actionName.split('-');
  if (!fileName) {
    throw Error('create action need file name');
  } else {
    createFile(createType, fileName)
  }
})();