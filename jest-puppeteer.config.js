module.exports = {
  launch: {
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--no-first-run', '--no-zygote'],
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
};
// 默认会跳过安装chromium 如果需要安装chromium请运行此命令 node node_modules/puppeteer/install.js
