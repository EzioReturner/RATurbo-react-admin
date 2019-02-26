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
  constructor() {
    // autorun(() => this.checkIsInitial(this.componentPath));
  }

  @action stopSpinning(): void {
    this.spinning = false;
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.unMountLoading();
    }, 600);
  }

  @action unMountLoading(): void {
    this.mountLoading = false;
    NProgress.done(true);
  }

  @action addInitializer(initializer: string): void {
    this.readyInitializers.push(initializer);
    this.mountLoading = true;
    this.spinning = true;
    NProgress.start();
  }

  @action checkIsInitial(path: string): void {
    !this.readyInitializers.includes(path) && this.addInitializer(path);
  }

  @action toggleCollapsed = () => {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);

    ET.resizeAllDisplayChart();
  };

  @action setOpenMenus(menus: Array<string>): void {
    this.openMenus = menus;
  }
}

export default MainStore;
