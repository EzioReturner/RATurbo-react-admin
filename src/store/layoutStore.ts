import { observable, configure, action, autorun } from 'mobx';
import isMobile from '@utlis/isMobile';
import debounce from '@utlis/debounce';
import NProgress from 'nprogress';

configure({ enforceActions: 'always' });
class LayoutStore {
  @observable spinning: boolean = true;
  @observable fixed: boolean = false;
  @observable mountLoading: boolean = true;
  @observable readyInitializers: Array<string> = [];
  @observable collapsed: boolean = false;
  @observable openMenus: Array<string> = [];
  @observable isMobile: boolean = false;
  @observable breadcrumbList: Array<object> = [];

  addWindowEvent(): void {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.changeStatus();
      })
    );
    this.changeStatus();
  }

  constructor() {
    this.addWindowEvent();
  }

  @action changeStatus(): void {
    const info: any = isMobile(navigator.userAgent);
    this.isMobile = info.any;
    this.isMobile && this.toggleCollapsed(true);
    const clientWidth = document.body.clientWidth;
    if (clientWidth < 1000) {
      this.toggleCollapsed(true);
    } else {
      this.toggleCollapsed(false);
    }
    if (clientWidth < 600) {
      this.isMobile = true;
    }
  }

  // 增加面包屑
  @action addBreadcrumb = (name: string, path: string): void => {};

  // 停止loading
  @action stopSpinning = (): void => {
    this.spinning = false;
    NProgress.done(true);
  };

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
  @action toggleCollapsed = (collapsed?: any): void => {
    this.collapsed = [true, false].includes(collapsed) ? collapsed : !this.collapsed;
  };

  // 设置打开的菜单
  @action setOpenMenus(menus: Array<string>): void {
    this.openMenus = menus;
  }
}

export default LayoutStore;
