import { observable, configure, action } from 'mobx';
import ET from '@utlis/echartTools';
import NProgress from 'nprogress';

configure({ enforceActions: 'always' });
class MainStore {
  @observable spinning: boolean = true;
  @observable fixed: boolean = false;
  @observable mountLoading: boolean = true;
  @observable readyInitializers: Array<string> = [];
  @observable collapsed: boolean = false;
  @observable openMenus: Array<string> = [];
  timeout: any = null;
  constructor() {}

  // 停止loading
  @action stopSpinning(): void {
    this.spinning = false;
    this.timeout && clearTimeout(this.timeout);
    NProgress.done(true);
  }

  // 记录懒加载模块并开启loading
  @action addInitializer(initializer: string): void {
    this.readyInitializers.push(initializer);
    this.mountLoading = true;
    this.spinning = true;
    NProgress.start();
  }

  // 检查是否已加载过
  @action checkIsInitial(path: string): void {
    !this.readyInitializers.includes(path) && this.addInitializer(path);
  }

  // 切换collapsed
  @action toggleCollapsed = () => {
    this.collapsed = !this.collapsed;
  };

  // 设置打开的菜单
  @action setOpenMenus(menus: Array<string>): void {
    this.openMenus = menus;
  }
}

export default MainStore;
