'use strict';
/* eslint-disable */

const fs = require('fs');
const path = require('path');
const TypeSrc = {
  '-v': 'views',
  '-c': 'components'
};
const ExternalTemplate = {
  '-page': upperName =>
    `import React, { Component } from 'react';\n` +
    `import PageWrapper from '@components/PageWrapper';\n` +
    `import FormatterLocale from '@components/FormatterLocale';\n` +
    `import style from './index.module.less';\n` +
    '\n' +
    `class ${upperName} extends Component {\n` +
    '\trender() {\n' +
    '\t\treturn (\n' +
    `\t\t<PageWrapper title={<FormatterLocale id="yourId" defaultMessage="${upperName}" />}>\n` +
    `\t\t\t${upperName} is at work\n` +
    '\t\t</PageWrapper>\n' +
    '\t);\n' +
    '\t}\n' +
    '}\n' +
    '\n' +
    `export default ${upperName};\n`,
  '-fc': upperName =>
    `import React from 'react';\n` +
    `import style from './index.module.less';\n` +
    '\n' +
    `interface ${upperName}Props {}\n` +
    '\n' +
    `const ${upperName}: React.FC<${upperName}Props> = props => {\n` +
    `\t return <div>${upperName} now is work!</div>;\n` +
    '}\n' +
    '\n' +
    `export default ${upperName};\n`
};

function getTemplate(fileName, externalAction) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  return ExternalTemplate[externalAction]
    ? ExternalTemplate[externalAction](fileName)
    : `import React, { Component } from 'react';\n` +
        `import style from './index.module.less';\n` +
        '\n' +
        `class ${upperName} extends Component {\n` +
        '\trender() {\n' +
        `\t\treturn <div>${upperName} now is work!</div>;\n` +
        '\t}\n' +
        '}\n' +
        '\n' +
        `export default ${upperName};\n`;
}

async function createFile(createType, fileName, externalAction) {
  const upperName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  console.log(upperName);

  const _path = path.resolve(__dirname, `../src/${TypeSrc[createType]}/${upperName}`);
  if (fs.existsSync(_path)) {
    throw Error('The file path already exists');
  } else {
    await fs.mkdir(_path, () => {});
    await fs.writeFileSync(`${_path}/index.tsx`, getTemplate(upperName, externalAction));
    await fs.writeFileSync(`${_path}/index.module.less`, '');
    console.log(`result: ···${upperName}··· has been created`);
  }
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
      '\n error---> raCreate action need file name \n\n like---> yarn raCreate -v exampleFileName \n'
    );
    return;
  }
  createFile(createType, fileName, externalAction);
})();
