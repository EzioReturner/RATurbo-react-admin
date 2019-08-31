process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
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
const fsExtra = require('fs-extra');
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
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild
} = require('react-dev-utils/FileSizeReporter');

const lib_version = libVersion ? libVersion.replace(/\./g, '_') : null;
const paths = require('../build/paths');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const buildDll = () => {
  return new Promise((resolve, reject) => {
    const existDll = IsUseDll ? checkDllFiles() : false;

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
};

const copyPublicFolder = () => {
  fsExtra.copySync(paths.appPublic, paths.appBuildDist, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
};

// build app
rm(rmFile, function(err) {
  if (err) throw err;
  measureFileSizesBeforeBuild(paths.appBuildDist).then(previousFileSizes => {
    buildDll()
      .then(res => {
        copyPublicFolder();
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
});
