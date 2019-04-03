import { observable, configure, action, computed } from 'mobx';
import SelectLang from '@src/components/SelectLang/index';

configure({ enforceActions: 'always' });
class LocaleStore {
  @observable locale: string = localStorage.getItem('ra-locale') || 'zh';
  @observable localeObj: any = {};
  constructor() {
    this.initLocaleList();
  }

  async initLocaleList(): Promise<any> {
    const json = await import(`../locales/${this.locale}/messages.json`);
    this.setLocaleObj(json);
  }

  @action setLocale(key: string): void {
    this.locale = key;
    this.initLocaleList();
    localStorage.setItem('ra-locale', key);
    window.location.reload();
  }

  @action setLocaleObj(json: any): void {
    this.localeObj = json.default;
  }

}

export default LocaleStore;