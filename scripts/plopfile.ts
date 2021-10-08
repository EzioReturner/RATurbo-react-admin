import { NodePlopAPI } from 'plop';
import path from 'path';
import { Observable } from 'rxjs';

const validateFn = (value: any) => {
  if (!value) {
    return '必填项';
  }
  return true;
};

const basePrompts = Observable.create((obs: any) => {
  obs.next({
    type: 'input',
    name: 'name',
    message: '请输入组件名称（多个单词使用短横线隔开式命名，如：my-name）',
    validate: validateFn
  });

  obs.next({ type: 'input', name: 'path', message: '请输入组件所属src路径', validate: validateFn });

  obs.next({ type: 'confirm', name: 'independentStyle', message: '是否需要创建样式文件夹' });

  obs.next({
    type: 'confirm',
    name: 'needRouter',
    message: '是否需要添加路由信息(请确保路由文件动态添加锚点存在)'
  });

  obs.complete();
});

const routerPrompts = Observable.create((obs: any) => {
  obs.next({
    type: 'input',
    name: 'routeName',
    message: '请输入路由菜单名称',
    validate: validateFn
  });

  obs.next({
    type: 'input',
    name: 'routePath',
    message: '请输入路由URL',
    validate: validateFn
  });

  obs.next({
    type: 'confirm',
    name: 'hideMenu',
    message: '是否需要隐藏菜单'
  });

  obs.next({
    type: 'confirm',
    name: 'loading',
    message: '是否需要懒加载loading'
  });

  obs.complete();
});

export default function (plop: NodePlopAPI) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: async inquirer => {
      const baseData: any = await inquirer.prompt(basePrompts);

      const { needRouter } = baseData;

      if (needRouter) {
        const routerData: any = await inquirer.prompt(routerPrompts);
        return { ...routerData, ...baseData };
      }

      return baseData;
    },
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
        const { routeName, routePath, hideMenu, loading } = data as any;
        const routeInfo = {
          name: routeName,
          path: routePath,
          component: ['/{{path}}/{{pascalCase name}}'],
          hideMenu,
          loading
        };

        _actions.push({
          type: 'modify',
          path: path.resolve(__dirname, '../src/config/router.config.tsx'),
          pattern: /(\/\/ \.\.\.async routes anchor \[do not remove this code\])/,
          template: `,${JSON.stringify(
            routeInfo
          )}\n// ...async routes anchor [do not remove this code]`
        });
      }

      return _actions;
    }
  });
}
