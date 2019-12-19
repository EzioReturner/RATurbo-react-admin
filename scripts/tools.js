/* eslint-disable */

const fs = require('fs');
const path = require('path');
const TypeSrc = {
  '-v': 'views',
  '-c': 'components'
};
const ExternalTemplate = {
  '-page': upperName =>
    `import React, { Component } from 'react'; \n` +
    `import PageWrapper from '@components/PageWrapper'; \n` +
    `import FormatterLocale from '@components/FormatterLocale'; \n` +
    `import style from './index.module.scss'; \n` +
    '\n' +
    `class ${upperName} extends Component { \n` +
    '\t render() {\n' +
    `\t\t return (<PageWrapper title={<FormatterLocale defaultMessage="${upperName}" />}> \n` +
    `\t\t\t ${upperName} is at work \n` +
    '\t\t </PageWrapper>); \n' +
    '\t } \n' +
    '} \n' +
    '\n' +
    `export default ${upperName};`
};

function getTemplate(fileName, externalAction) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  return ExternalTemplate[externalAction]
    ? ExternalTemplate[externalAction](fileName)
    : `import React, { Component } from 'react'; \n` +
        `import style from './index.module.scss'; \n` +
        '\n' +
        `class ${upperName} extends Component { \n` +
        '\t render() {\n' +
        '\t\t return ( \n' +
        `\t\t\t <div>${upperName} is work!</div> \n` +
        '\t\t ) \n' +
        '\t } \n' +
        '} \n' +
        '\n' +
        `export default ${upperName};`;
}

async function createFile(createType, fileName, externalAction) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const _path = path.resolve(__dirname, `../src/${TypeSrc[createType]}/${upperName}`);
  fs.exists(_path, async function(exists) {
    if (exists) {
      throw Error('file path was existed');
    } else {
      await fs.mkdir(_path, () => {});
      await fs.writeFileSync(`${_path}/index.jsx`, getTemplate(fileName, externalAction));
      await fs.writeFileSync(`${_path}/index.module.scss`, '');
      console.log(`createType: ···${fileName}··· created`);
    }
  });
}

(async () => {
  const config_argv = JSON.parse(process.env.npm_config_argv);
  let original = config_argv.original;
  if (original[0] === 'run') {
    original = original.slice(1);
  }
  let [, createType, fileName, externalAction] = original;
  if (!['-v', '-c'].includes(createType)) {
    console.log(
      `\n error---> unsupport create type: >>${createType}<< \n\n support create type---> [-v, -c] \n`
    );
    return;
  }
  if (!fileName) {
    console.log(
      '\n error---> raCreate action need file name \n\n like---> yarn raCreate -v example \n'
    );
    return;
  }
  createFile(createType, fileName, externalAction);
})();
