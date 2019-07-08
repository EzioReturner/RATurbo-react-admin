module.exports = {
  // server: {
  //   command: `npm start`,
  //   port: 3000,
  //   launchTimeout: 10000,
  //   debug: true,
  // },
  launch: {
    headless: true, //设定运行模式，false的情况下将会工作在有GUI界面的模式，true则不开启GUI界面
    executablePath: //设定本地Chrome路径，官方推荐使用Chrome Canary
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
}