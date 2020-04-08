import { observable, configure, action, computed } from 'mobx';
import isMobile from '@utils/isMobile';
import { debounce } from '@utils/tools';
import NProgress from 'nprogress';
import { Breadcrumb, RouteConfig, RouteChild } from '@models/layout';
import { useMenu, useHeader, layoutMode } from '@config/setting';
import { constantRouteConfig, asyncRouteConfig } from '@config/router.config';
import { userStore } from './userStore';
import intersection from 'lodash/intersection';

interface LoadingOptions {
  fixed?: boolean; // 只覆盖路由可视区域
  spinning: boolean; // 开启关闭遮罩
  text?: string | number | React.ReactNode; // 文案
}
configure({ enforceActions: 'observed' });
class LayoutStore {
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

  // 显示头部
  @observable showMenu: boolean = useMenu;

  // 显示菜单
  @observable showHeader: boolean = useHeader;

  // 布局模式
  @observable layoutMode: string = layoutMode || 'splitLayout';

  // 全局spinning配置信息
  @observable loadingOptions: LoadingOptions = { spinning: false };

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

  @computed
  get authPopRoute() {
    const [, app] = this.routeConfig;
    const appRoutes = app.routes;
    if (appRoutes) {
      let redirectPath = '';
      for (let index = 0; index < appRoutes.length; index++) {
        const { redirect, authority: routeAuthority, path } = appRoutes[index];
        if (redirect || path === '/') continue;
        const allowed = !routeAuthority || intersection(userStore.authority, routeAuthority);
        if (allowed) {
          redirectPath = path;
          break;
        }
      }
      return redirectPath;
    }
    return '';
  }

  get isInlineLayout() {
    return this.layoutMode === 'inlineLayout';
  }

  // 初始化菜单
  @action initMenu(): void {
    this.routeConfig = [constantRouteConfig.app];
    this.setMenu();
  }

  // 动态设置路由方法
  @action setMenu(): void {
    const { app, user } = constantRouteConfig;
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

  @action ctrlSpinning = (options: LoadingOptions) => {
    this.loadingOptions = options;
  };

  @action ctrlProgress = (type: boolean) => {
    type ? NProgress.start() : NProgress.done(true);
  };

  // 记录懒加载模块并开启loading
  @action addInitializer(initializer: string, loading: boolean = false): void {
    this.readyInitializers.push(initializer);
    loading && this.ctrlSpinning({ spinning: true });
    NProgress.start();
  }

  // 检查是否已加载过
  @action checkIsInitial(route: RouteChild): void {
    const { path, loading, name } = route;
    if (!this.readyInitializers.includes(path)) {
      this.addInitializer(path, loading);
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

  @action setShowHeader = (showHeader: boolean) => {
    this.showHeader = showHeader;
  };

  @action setShowMenu = (showMenu: boolean) => {
    this.showMenu = showMenu;
  };
}
export const layoutStore = new LayoutStore();
export default LayoutStore;
