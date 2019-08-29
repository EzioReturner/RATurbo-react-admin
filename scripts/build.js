'use strict';
//node for loading
const ora = require('ora');
// rm-rf for node
const rm = require('rimraf');
//console for node
const chalk = require('chalk');
//path for node
const path = require('path');
//webpack
const webpack = require('webpack');
//webpack production setting
const configFactory = require('../build/webpack.config');
// fs
const fs = require('fs');
// dll webpack config
const dllConfig = require('../build/webpack.dll');
// remove file path
const rmFile = path.resolve(__dirname, '../build/dist');
//build start loading
const spinner = ora({ color: 'green', text: 'building for production...' });
// get process arguments
const { original } = JSON.parse(process.env.npm_config_argv);
const IsUseDll = original.includes('--useDll');
// get library files name & version
const { library, libVersion } = require('../package.json');
const lib_version = libVersion.replace(/\./g, '_');

const buildDll = () => {
  return new Promise((resolve, reject) => {
    const existDll = checkDllFiles();

    if (!IsUseDll || existDll) {
      resolve();
    } else {
      const _spinner = ora({ color: 'green', text: 'building for dll-vendor...' });

      _spinner.start();
      const dllCompiler = webpack(dllConfig);

      dllCompiler.run((err, stats) => {
        err && reject(err);
        _spinner.stop();
        resolve();
        console.log(chalk.cyan('Build dll-vendor done \n'));
      });
    }
  });
};

// check dll.js exists
const checkDllFiles = () => {
  const dllPath = path.resolve(__dirname, '../build/dll');
  const dllDirectory = fs.existsSync(dllPath);
  if (!dllDirectory) {
    return false;
  } else {
    const files = fs.readdirSync(dllPath);
    return Object.keys(library).every(name => {
      return files.includes(`${name}.${lib_version}.dll.js`);
    });
  }
};

// build app
rm(rmFile, function(err) {
  if (err) throw err;

  buildDll()
    .then(res => {
      spinner.start();
      const config = configFactory('production');
      const compiler = webpack(config);
      compiler.run((err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n'
        );
        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'));
          process.exit(1);
        }
        console.log(chalk.cyan('  Build complete.\n'));
      });
    })
    .catch(err => {
      if (err) throw err;
    });
});
