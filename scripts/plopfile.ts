import { NodePlopAPI } from 'plop';
import path from 'path';

const validateFn = (value: any) => {
  if (!value) {
    return '必填项';
  }
  return true;
};

export default function (plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入组件名称（多个单词使用短横线隔开式命名，如：my-name）',
        validate: validateFn
      },
      { type: 'input', name: 'path', message: '请输入组件所属src路径', validate: validateFn },
      { type: 'confirm', name: 'independentStyle', message: '是否需要创建样式文件夹' },
      {
        type: 'confirm',
        name: 'needRouter',
        message: '是否需要添加路由信息(请确保路由文件动态添加锚点存在)'
      }
    ],
    actions: function (data) {
      const { independentStyle, needRouter } = data as any;

      let _actions: any[] = [
        {
          type: 'add',
          path: path.resolve(__dirname, '../src/{{path}}/{{pascalCase name}}/index.tsx'),
          templateFile: path.resolve(__dirname, '../templates/component/index.hbs')
        },
        {
          type: 'add',
          path: path.resolve(__dirname, '../src/{{path}}/{{pascalCase name}}/interface.ts'),
          templateFile: path.resolve(__dirname, '../templates/component/interface.hbs')
        }
      ];

      if (independentStyle) {
        _actions.push({
          type: 'add',
          path: path.resolve(__dirname, '../src/{{path}}/{{pascalCase name}}/style/index.less'),
          templateFile: path.resolve(__dirname, '../templates/component/style.hbs')
        });
      } else {
        _actions.push({
          type: 'add',
          path: path.resolve(__dirname, '../src/{{path}}/{{pascalCase name}}/index.less'),
          templateFile: path.resolve(__dirname, '../templates/component/style.hbs')
        });
      }

      if (needRouter) {
        _actions.push({
          type: 'modify',
          path: path.resolve(__dirname, '../src/config/router.config.tsx'),
          pattern: /(\/\/ \.\.\.async routes anchor \[do not remove this code\])/,
          template:
            ",{ \nname: '{{pascalCase name}}',\nicon: <PieChartOutlined />,\npath: '{{pascalCase name}}',\ncomponent: ['/{{path}}/{{pascalCase name}}'],\nloading: true\n}\n// ...async routes anchor [do not remove this code]"
        });
      }

      return _actions;
    }
  });
}
