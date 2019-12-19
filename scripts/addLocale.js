/* eslint-disable */

const fs = require('fs');
const path = require('path');

// 创建 语言 文件夹目录
async function mkdirs(outputDir, callback) {
  fs.exists(outputDir, async function(exists) {
    if (exists) {
      callback && callback();
      console.log('the file dir has already existed now remove file');
      rmdir(outputDir);
    } else {
      await fs.mkdir(outputDir, callback);
      console.log(`file dir create success`);
      await fs.writeFileSync(`${outputDir}/mapping.json`, '{}');
      console.log('language json create success');
    }
  });
}

// 删除存在的目录
async function rmdir(dirname) {
  files = fs.readdirSync(dirname);
  files.forEach((file, index) => {
    let curPath = dirname + '/' + file;
    if (fs.statSync(curPath).isDirectory()) {
      rmdir(curPath); //递归删除文件夹
    } else {
      fs.unlinkSync(curPath); //删除文件
    }
  });
  await fs.rmdir(dirname, function(error) {
    if (error) {
      console.log(error);
      return false;
    }
  });
  console.log('delete success now recreate');
  setTimeout(() => {
    mkdirs(dirname, () => {
      console.log('recreate done');
    });
  }, 1000);
}

(async () => {
  const language = process.argv.pop();
  const dir = `../src/locales/${language}`;
  const outputDir = path.resolve(__dirname, dir);
  await mkdirs(outputDir, () => {
    console.log('done');
  });
})();
