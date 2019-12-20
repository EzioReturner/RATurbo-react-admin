# 构建与发布

## 构建

当项目开发完毕，运行下方命令打包应用：

```bash
yarn build
```

打包完成后，将看到如下输出：
```bash
yarn run v1.13.0
$ node scripts/build.js
Creating an optimized production build...
...
File sizes after gzip:
  589.23 KB  build/static/js/143.d8617bc9.chunk.js
  85.95 KB   build/static/js/17.b0a04ca8.chunk.js
  66.87 KB   build/static/js/78.ab38afa3.chunk.js
  64.45 KB   build/static/js/23.c90835f3.chunk.js
  62.67 KB   build/static/js/88.a15a517e.chunk.js
...
✨  Done in 65.68s.
```

`build` 命令会打包所有的资源，包含 JavaScript, CSS, web fonts, images, html 等。你可以在 build/dist 目录下找到这些文件。

### dll构建优化

RA针对项目包含较多不变依赖库的部署情况，提供了 dll 优化方案，运行如下命令：

```bash
# 你可以选择
yarn build --dll 
# 一次性部署完整的dll依赖包以及前端项目

# 或
yarn build:dll 
# 只对dll依赖进行打包
```

dll打包项目以及可编写的对应版本号保存在 `package.json` 中。

```javascript
...
"libVersion": "1.0.0",
"library": {
  "reactLib": [
    "react",
    "react-dom",
    "react-router-dom",
    "react-transition-group"
  ],
  "components": [
    "antd",
    "echarts",
    "mobx",
    "mobx-react"
  ],
  "tools": [
    "mockjs",
    "axios",
    "lodash",
    "moment",
    "nprogress"
  ]
}
...
```

> 首次运行 `yarn build --dll` 时打包时间会较长，由于区分不同依赖而进行两次打包

### 分析构建文件体积

这里我们提供了，工具命令 `analyze` 命令构建并分析依赖模块的体积分布，从而优化你的代码。

```bash
yarn build --analyze
```

## 本地验证

利用 `serve` 可以在发布之前进行本地验证。

安装 `serve`

```bash
yarn global add serve
```

进行本地验证

```bash
$ serve ./build

  ┌────────────────────────────────────────────────────┐
  │                                                    │
  │   Serving!                                         │
  │                                                    │
  │   - Local:            http://localhost:5000        │
  │   - On Your Network:  http://10.112.160.225:5000   │
  │                                                    │
  │   Copied local address to clipboard!               │
  │                                                    │
  └────────────────────────────────────────────────────┘
```
访问 `http://localhost:5000`，正常验证情况下可以看到和本地开发一致的页面。

## 部署

这里我们以 [leanCloud](https://leancloud.cn/) 部署为例。

- 首先先完成 `lean-cli` 安装等一系列操作，参考[教程](https://leancloud.cn/docs/leanengine_cli.html)

- 新建一个空文件夹，使用 `lean init` 初始化项目，该项目为 [leancloud](https://leancloud.cn/dashboard/applist.html#/apps) 应用中创建，
  1. 选择已创建的应用
  ```bash
  $ lean init
  [?] Please select an app:
  1) exampleApp
  => 1
  ```
  2. 选择开发语言，这里我们选择 `5` ，其他类型。
  ```bash
  ...
  [?] Please select a language
  1) Node.js
  2) Python
  3) Java
  4) PHP
  5) Others
  => 5
  ```
  3. 选择模板类型，这里选择 `1` 静态网站
  ```bash
  ...
  [?] Please select an app template:
  1) Static Site
  => 1
  ```
- 之后我们将打包好的 `build/` 目录下的文件拷贝至 `lean init` 初始化后的文件夹内。运行如下命令：

  ```bash
  $ lean deploy
  [INFO] Current CLI tool version:  0.20.0
  [ERROR] exit status 128
  [INFO] Retrieving app info ...
  [INFO] Preparing to deploy ra-turbo(J0WMYvIANB8MURsxqvCVcOeP-gzGzoHsz) to region: cn group: web production
  [INFO] Node.js runtime detected
  [INFO] Uploading file 8.00 MiB / 8.00 MiB [========================] 100.00% 16s
  [REMOTE] 开始构建 20190524-135516
  [REMOTE] 正在下载应用代码 ...
  [REMOTE] 正在解压缩应用代码 ...
  [REMOTE] 运行环境：nodejs
  [REMOTE] 正在下载和安装依赖项 ...
  [REMOTE] 存储镜像到仓库（82.77MB）...
  [REMOTE] [Node.js] 使用 Node.js v6.17.1, Node SDK N/A
  [REMOTE] 版本 20190524-135516 构建完成
  [REMOTE] 开始部署 20190524-135516 到 web1
  [REMOTE] 正在创建新实例 ...
  [REMOTE] 正在启动新实例 ...
  [REMOTE] 实例启动成功：React Turbo
  [REMOTE] 正在更新云函数信息 ...
  [REMOTE] [ERROR] 云函数信息接口返回 404，已忽略云函数和 Hook
  [REMOTE] 部署完成：1 个实例部署成功
  [INFO] Deleting temporary files
  ```
当看见如上信息时，说明应用已经部署完毕，我们访问 lenacloud 应用中云引擎设置里的web主机域名 [http://ra-turbo.leanapp.cn/#/dashboard](http://ra-turbo.leanapp.cn/#/dashboard)。就可以看到部署成功后的页面了！