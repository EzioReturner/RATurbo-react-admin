import { layoutStore } from './layoutStore';
import ProgramStore from './programStore';
import { userStore } from './userStore';
import { localeStore } from './localeStore';

const programStore = new ProgramStore();

export const Store = {
  programStore,
  layoutStore,
  userStore,
  localeStore
};
