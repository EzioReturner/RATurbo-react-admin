# 新增页面

这里的『页面』指业务组件，或是通用组件，通常要新建一个页面，可以手动在目录下创建目录及文件，或使用内置指令一键生成。

## 新增业务模块 

按照RA的约定，我们通常将业务组件放置在`src/views`目录下，我们使用下面的指令创建一个新的业务模块 ：

```bash
yarn raCreate -v exampleView
```

之后会在控制台看到以下输出

```bash
...
yarn run v1.13.0
$ node scripts/tools.js -v exampleView
createType: ···exampleView··· created
✨  Done in 0.27s.
...
```

之后我们前往 `src/views` 目录下，一个基础的页面 `tsx、scss` 文件已生成，样式默认使用 `CSS Module` ，可参考 [样式与主题](/cssStyle)

![addView](/media/addview.png)。


并附带了基础代码
```javascript
import React, { Component } from 'react'; 
import style from './index.module.scss'; 

class ExampleView extends Component {
	render() {
		return <div>ExampleView now is work!</div>;
	}
}

export default ExampleView;
```


### function component 模式的业务模块

在指令中添加额外配置项 `-fc`  将生成一个function component

```bash
yarn raCreate -v exampleFC -fc
```

```javascript
import React from 'react';
import style from './index.module.scss';

interface ExampleFCProps {}

const ExampleFC: React.FC<ExampleFCProps> = props => {
  return <div>ExampleFC now is work!</div>;
};

export default ExampleFC;
```


### 定制 page 样式基础模块

在指令中添加额外配置项 `-page` 可以生成附带面包屑以及可定制的header的基础page页面，我们在控制台输入如下代码：

```bash
yarn raCreate -v examplePage -page
```

打开文件后 `examplePage.jsx` 文件我们将看到如下代码：

```javascript
import React, { Component } from 'react'; 
import PageWrapper from '@components/PageWrapper'; 
import FormatterLocale from '@components/FormatterLocale'; 
import style from './index.module.scss'; 

class examplePage extends Component { 
  render() {
    return <PageWrapper title={<FormatterLocale id="yourId" defaultMessage="examplePage" />}> 
      ExamplePage is at work!
    </PageWrapper>; 
  } 
} 

export default ExamplePage;
```

>在路由配置项中添加相应的路由信息，配置过程可参考 [路由与菜单](/router)，之后输入对应的url，我们可以看到如下页面，一个附带header头部，body，以及面包屑的基础页面已经生成。

![examplePage](/media/examplePage.png)


## 新增公共组件

公共组件新增与业务组件类似，将指令中的 `-v` 改成 `-c` 即可：

```bash
yarn raCreate -c exampleComponent
```

代码执行后文件将生成在 `src/components` 路径下。


## PageWrapper组件

>上例中，我们引入了PageWrapper组件，该组件接收以下参数：

### hideBreadcrumb

- 类型： `boolean`

  控制是否显示面包屑

### title

- 类型： `string` 或者 `ReactDOM`

### subTitle

- 类型： `string` 或者 `ReactDOM`

### content

- 类型： `string` 或者 `ReactDOM`

### extraContent

- 类型： `string` 或者 `ReactDOM`

详细对应可参考下图，具体使用代码参考 `src/views/List/CardList.jsx`[![](/media/link.svg)](https://github.com/EzioReturner/RATurbo-react-admin/blob/master/src/views/List/CardList.jsx) 文件。

![pageHeader](/media/pageHeader.png)