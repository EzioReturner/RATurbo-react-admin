import LayoutStore from './layoutStore';
import UserStore from './userStore';
import LocaleStore from './localeStore';

const layoutStore = new LayoutStore();
const userStore = new UserStore();
const localeStore = new LocaleStore();

export const Store = {
  layoutStore,
  userStore,
  localeStore
};
