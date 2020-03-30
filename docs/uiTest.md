# UI测试

## e2e测试

RA中集成了 `jest-puppeteer` 的端到端测试方案，配置文件位于 `jest-puppeteer.config.js` 与 `jest.config.js`

> 运行如下命令将自动执行e2e文件夹下所有测试用例

```bash
yarn test:e2e
```

可见如下输出
```bash
yarn run v1.13.0
$ jest -c src/e2e/jest.config.js
 PASS  src/e2e/404.e2e.js (8.793s)
 PASS  src/e2e/login.e2e.js (12.784s)
 PASS  src/e2e/mainLayout.e2e.js (35.631s)

Test Suites: 3 passed, 3 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        36.894s
Ran all test suites.
✨  Done in 40.82s.
```


## unit单元测试