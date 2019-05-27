# 内置命令

RA中，除了常规的启动和构建命令，额外提供了如下几个内置命令。

## 新增页面 & 组件

> 参考 [新增业务组件](/addPage?id=新增业务组件)

```bash
yarn raCreate -v exampleView
```

```bash
yarn raCreate -c exampleComponent
```

## 增加语言包

> 参考 [新增应用语言](/i18n?id=新增应用语言)

```bash
yarn run add-locale
```

## 翻译语言包

```bash
yarn run translate
```

## 构建分析

运行后将默认在 `127.0.0.1:8888` 打开分析页面。

```bash
yarn run analyze
```