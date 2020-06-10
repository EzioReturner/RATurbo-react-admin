import { postLogin } from '@api/user';
import { action, configure, observable, runInAction } from 'mobx';

type IdentifyStatus = 'identifying' | 'identifyPass' | 'unauthorized';

configure({ enforceActions: 'observed' });
class UserStore {
  // 用户信息
  @observable userInfo: any = {};
  // 用户权限码
  @observable authority: string[] = [];
  // 当前的验证状态
  @observable identifyStatus: IdentifyStatus = 'identifying';

  constructor() {
    this.initUserInfo();
  }

  // 获取用户权限
  getAuthority = (str?: undefined | string): string[] => {
    const authorityString: string | null =
      typeof str === 'undefined' ? window.localStorage.getItem('RA-authority') : str;
    let authority: string[];
    authority = authorityString ? JSON.parse(authorityString) : [];
    return authority;
  };

  // 设置用户权限
  @action setAuthority = (authority: string | string[]): void => {
    const raAuthority: string[] = typeof authority === 'string' ? [authority] : authority;
    window.localStorage.setItem('RA-authority', JSON.stringify(raAuthority));
    this.authority = raAuthority;
  };

  // 用户登录事件
  @action handleUserLogin(name: string, password: number): Promise<boolean> {
    this.identifyStatus = 'identifying';
    return postLogin(name, password)
      .then((res: any) => {
        const { message, userInfo } = res;
        if (message === 'ok') {
          const data = userInfo.data[0];
          this.setUserInfo(data);
          this.setAuthority(name);
          runInAction(() => {
            this.identifyStatus = 'identifyPass';
          });
          return true;
        }
        return false;
      })
      .catch(err => {
        runInAction(() => {
          this.identifyStatus = 'unauthorized';
        });
        this.setAuthority([]);
        return false;
      });
  }

  // 设置用户信息
  @action setUserInfo(userInfo: object): void {
    this.userInfo = userInfo;
    window.localStorage.setItem('RA-user', JSON.stringify(userInfo));
  }

  // 用户登出，重置信息
  @action userLogout = (): void => {
    this.userInfo = {};
    this.authority = [];
    window.localStorage.removeItem('RA-authority');
    window.localStorage.removeItem('RA-user');
  };

  // 重新拉取用户信息
  @action initUserInfo = async (): Promise<any> => {
    const localUserInfo: string | null = window.localStorage.getItem('RA-user');
    const userAuthority: string[] = this.getAuthority();
    // 存在权限和用户信息
    if (userAuthority.length && localUserInfo) {
      this.setUserInfo(JSON.parse(localUserInfo));
      this.identifyStatus = 'identifyPass';
      this.setAuthority(userAuthority);
    } else {
      this.identifyStatus = 'unauthorized';
      this.setAuthority([]);
    }
  };
}
export const userStore = new UserStore();
export default UserStore;
