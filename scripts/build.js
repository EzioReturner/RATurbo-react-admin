'use strict';
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.GENERATE_SOURCEMAP = false;
//node for loading
const ora = require('ora');
// rm-rf for node
const rm = require('rimraf');
//console for node
const chalk = require('chalk');
//webpack
const webpack = require('webpack');
//webpack production setting
const configFactory = require('../webpack/webpack.config');
// fs
const fs = require('fs');

const fsExtra = require('fs-extra');
// dll webpack config
const dllConfig = require('../webpack/webpack.dll');
//build start loading
const spinner = ora({ color: 'green', text: 'building for production...' });
const { original } = JSON.parse(process.env.npm_config_argv);
const useDll = original.includes('--dll');
// get process arguments
// get library files name & version
const { library, libVersion } = require('../package.json');

const lib_version = libVersion ? libVersion.replace(/\./g, '_') : null;

const paths = require('../webpack/paths');

const { measureFileSizesBeforeBuild, printFileSizesAfterBuild } = require('./devUtils/fileReport');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// build app
rm(paths.appBuildDist, function(err) {
  if (err) throw err;
  measureFileSizesBeforeBuild(paths.appBuildDist).then(previousFileSizes => {
    buildDll()
      .then(res => {
        copyPublicFileToFolder();
        spinner.start();
        const config = configFactory('production');
        const compiler = webpack(config);
        compiler.run((err, stats) => {
          spinner.stop();
          if (err) throw err;
          printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            paths.appBuildDist,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE
          );
          checkRunError(stats);

          console.log(chalk.cyan('  Build complete.\n'));
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  });
});

function buildDll() {
  return new Promise((resolve, reject) => {
    const existDll = useDll ? checkDllFiles() : false;

    if (!useDll || existDll) {
      resolve();
    } else {
      const _spinner = ora({ color: 'green', text: 'building for dll-vendor...' });

      _spinner.start();
      const dllCompiler = webpack(dllConfig);

      dllCompiler.run((err, stats) => {
        err && reject(err);
        checkRunError(stats);
        _spinner.stop();
        console.log(chalk.cyan('Build dll-vendor done \n'));
        resolve();
      });
    }
  });
}

// check dll.js exists
function checkDllFiles() {
  const dllPath = paths.appBuildDll;
  const dllDirectory = fs.existsSync(dllPath);
  if (!dllDirectory) {
    return false;
  } else {
    const files = fs.readdirSync(dllPath);
    return Object.keys(library).every(name => {
      return files.includes(`${name}.${lib_version}.dll.js`);
    });
  }
}

function copyPublicFileToFolder() {
  fsExtra.copySync(paths.appPublic, paths.appBuildDist, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

function checkRunError(stats) {
  if (stats.hasErrors()) {
    process.stdout.write(stats.toString() + '\n');
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }
}
