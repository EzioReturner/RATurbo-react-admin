'use strict';

const fs = require('fs');
const chalk = require('chalk');
const paths = require('../build/paths');
const clearConsole = require('react-dev-utils/clearConsole');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const isInteractive = process.stdout.isTTY;

function printInstructions(appName, urls, statsData) {
  console.log();
  console.log(`Your application ${chalk.bold(appName)} is running at:`);
  console.log();

  if (urls.lanUrlForTerminal) {
    console.log(`  ${chalk.bold('Local:')}            ${chalk.cyan(urls.localUrlForTerminal)}`);
    console.log(`  ${chalk.bold('On Your Network:')}  ${chalk.cyan(urls.lanUrlForTerminal)}`);
  } else {
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log();
}

const createCompiler = (config, urls, devSocket) => {
  const appName = require(paths.appPackageJson).name;
  const useTypeScript = fs.existsSync(paths.appTsConfig);

  const compiler = webpack(config);
  compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;
  let tsMessagesPromise;
  let tsMessagesResolver;

  if (useTypeScript) {
    compiler.hooks.beforeCompile.tap('beforeCompile', () => {
      tsMessagesPromise = new Promise(resolve => {
        tsMessagesResolver = msgs => resolve(msgs);
      });
    });

    ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler).receive.tap(
      'afterTypeScriptCheck',
      (diagnostics, lints) => {
        const allMsgs = [...diagnostics, ...lints];
        const format = message => `${message.file}\n${typescriptFormatter(message, true)}`;

        tsMessagesResolver({
          errors: allMsgs.filter(msg => msg.severity === 'error').map(format),
          warnings: allMsgs.filter(msg => msg.severity === 'warning').map(format)
        });
      }
    );
  }

  compiler.hooks.done.tap('done', async stats => {
    if (isInteractive) {
      clearConsole();
    }

    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true
    });

    if (useTypeScript && statsData.errors.length === 0) {
      const delayedMsg = setTimeout(() => {
        console.log(chalk.yellow('Files successfully emitted, waiting for typecheck results...'));
      }, 100);

      const messages = await tsMessagesPromise;
      clearTimeout(delayedMsg);
      statsData.errors.push(...messages.errors);
      statsData.warnings.push(...messages.warnings);

      // Push errors and warnings into compilation result
      // to show them after page refresh triggered by user.
      stats.compilation.errors.push(...messages.errors);
      stats.compilation.warnings.push(...messages.warnings);

      if (messages.errors.length > 0) {
        devSocket.errors(messages.errors);
      } else if (messages.warnings.length > 0) {
        devSocket.warnings(messages.warnings);
      }

      if (isInteractive) {
        clearConsole();
      }
    }

    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      printInstructions(appName, urls, statsData);
    }
    isFirstCompile = false;

    // If errors exist, only show errors.
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));

      // Teach some ESLint tricks.
      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      );
    }
  });

  return compiler;
};

module.exports = {
  createCompiler
};
