import { observable, configure, action } from 'mobx';
import {
  createMemorySource,
  createHistory,
} from "@reach/router";
import { History, HistorySource } from 'reach__router';

configure({ enforceActions: 'always' });
class RouterStore {
  historyPath: string = localStorage.getItem('ra-memoryHistory') || '/dashboard';
  source: HistorySource = createMemorySource(this.historyPath);
  @observable memoryHistory: History = createHistory(this.source);

  constructor() {
  }

  @action createMemoryHistory = (pathName: string): void => {
    localStorage.setItem('ra-memoryHistory', pathName);
    const source = createMemorySource(pathName);
    this.memoryHistory = createHistory(source);
  }
}

export default RouterStore;