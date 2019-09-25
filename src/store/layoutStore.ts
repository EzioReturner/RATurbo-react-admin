import { observable, configure, action } from 'mobx';
import isMobile from '@utils/isMobile';
import debounce from '@utils/debounce';
import NProgress from 'nprogress';
import { Breadcrumb, RouteConfig } from '@models/index';
import { constantRouteConfig, asyncRouteConfig } from '@config/router.config';

configure({ enforceActions: 'observed' });
class LayoutStore {
  // loading 是否显示
  @observable spinning: boolean = true;

  // loading 是否覆盖全局
  @observable fixed: boolean = false;

  // 存放已经初始化完毕的页面
  @observable readyInitializers: Array<string> = [];

  // 菜单栏是否展开
  @observable collapsed: boolean = false;

  // 开启的菜单
  @observable openMenus: Array<string> = [];

  // 是否是手机浏览器
  @observable isMobile: boolean = false;

  // 面包屑列表
  @observable breadcrumbList: Array<Breadcrumb> = [];

  // 路由数据
  @observable routeConfig: Array<RouteConfig> = [];

  constructor() {
    this.addWindowEvent();
    this.changeStatus();
    this.initMenu();
  }

  addWindowEvent(): void {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.changeStatus();
      })
    );
  }

  // 初始化菜单
  @action initMenu(): void {
    this.routeConfig = constantRouteConfig;
    this.setMenu();
  }

  // 动态设置路由方法
  @action setMenu(): void {
    const [user] = constantRouteConfig;
    const app: any = constantRouteConfig[1];
    app.routes = asyncRouteConfig;
    this.routeConfig = [user, app];
  }

  // 响应分辨率
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

  // 初始化面包屑
  @action initBreadcrumb(name: string, path: string): void {
    this.breadcrumbList.push({
      name,
      path,
      display: false
    });
  }

  // 增加面包屑
  @action addBreadcrumb = (path: string): void => {
    const cache: Breadcrumb | undefined = this.breadcrumbList.find(
      (res: Breadcrumb) => res.path === path
    );
    cache && (cache.display = true);
  };

  // 删除面包屑
  @action delBreadcrumb = (name: string, path: string): any => {
    let delSelf = false;
    this.breadcrumbList = this.breadcrumbList.reduce(
      (total: Array<Breadcrumb>, index: Breadcrumb): Array<Breadcrumb> => {
        if (index.name === name) {
          index.display = false;
          delSelf = index.path === path;
        }
        total.push(index);
        return total;
      },
      []
    );
    return delSelf ? this.breadcrumbList[0] : null;
  };

  // 停止loading
  @action stopSpinning = (): void => {
    this.spinning = false;
    NProgress.done(true);
  };

  // 记录懒加载模块并开启loading
  @action addInitializer(initializer: string): void {
    this.readyInitializers.push(initializer);
    this.spinning = true;
    NProgress.start();
  }

  // 检查是否已加载过
  @action checkIsInitial(route: any): void {
    const { path, name } = route;

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
