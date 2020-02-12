# 使用 TypeScript

> TypeScript is a superset of javascript that adds a lot of useful features compared to javascript:

使用 TypeScript 对 IDE 会更加友好，如果你是用 vscode 开发的，那么你的开发体验将会显著提升。RA 中自带了 TypeScript 所需的配置文件。

- tsconfig.json

tsconfig 会声明这是一个 TypeScript 的项目，其中会进行一些配置，详细内容可以看[这里](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。 tslint 类似 eslint 将会检查你的代码。

> 注意：在2.0之后已全面使用 TypeScript 来编写项目前端部分，使用 eslint 负责校验类型 

## 常见问题

### CSS Module

RA 中支持了 css-module，如果你在 TypeScript 文件中使用：

```javascript
import style from './index.module.scss';
```

这时 TypeScript 会报错，可以替换成：

```javascript
const style = require('./index.module.scss');
```

### alias 路径配置

在 webpack 中添加的路径 `alias`，需要在 tsconfig.js 中的 `path` 进行配置：

```javascript
...
"paths": {
  "@src/*": ["src/*"],
  "@api/*": ["src/api/*"],
}
...
```

一个普通的 tsx 模板，可以参考 `views/TsExample/index.tsx`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/views/TsExample/index.tsx) ：

```javascript
import React, { Component } from 'react';
const style = require('./index.module.scss');

interface TitleProps {
  title: string;
}

class Title extends Component<TitleProps, any> {
  render() {
    const { title } = this.props;
    return <h1 className={style.title}>
      {title}
    </h1>
  }
}
```