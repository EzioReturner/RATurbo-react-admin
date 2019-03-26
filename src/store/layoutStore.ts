import { observable, configure, action } from 'mobx';
import isMobile from '@utlis/isMobile';
import debounce from '@utlis/debounce';
import NProgress from 'nprogress';
import routeConfig from '../config/router.config';
interface Breadcrumb {
  name: string;
  path: string;
  display: boolean;
}
configure({ enforceActions: 'always' });
class LayoutStore {
  @observable spinning: boolean = true;
  @observable fixed: boolean = false;
  @observable mountLoading: boolean = true;
  @observable readyInitializers: Array<string> = [];
  @observable collapsed: boolean = false;
  @observable openMenus: Array<string> = [];
  @observable isMobile: boolean = false;
  @observable breadcrumbList: Array<Breadcrumb> = [];
  routeConfig: Array<object> = [];

  constructor() {
    this.addWindowEvent();
    this.changeStatus();
    this.routeConfig = routeConfig;
  }

  addWindowEvent(): void {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.changeStatus();
      })
    );
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

  @action initBreadcrumb(name: string, path: string): void {
    this.breadcrumbList.push({
      name,
      path,
      display: false
    })
  }

  // 增加面包屑
  @action addBreadcrumb = (path: string): void => {
    const cache: Breadcrumb | undefined = this.breadcrumbList.find((res: Breadcrumb) => res.path === path);
    cache && (cache.display = true)
  };

  @action delBreadcrumb = (name: string): any => {
    const cache: Breadcrumb | undefined = this.breadcrumbList.find(res => res.name === name);
    cache && (cache.display = false);
    return this.breadcrumbList.find(res => res.display);
  }

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
  @action checkIsInitial(route: any): void {
    const { path, name } = route
    if (!this.readyInitializers.includes(path)) {
      this.addInitializer(path);
      name && this.initBreadcrumb(name, path);
    }
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
