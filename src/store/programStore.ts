import { observable, configure, action, computed } from 'mobx';
import { cloneDeep } from 'lodash';
import { analysisOptions } from '@/assets/chartOption.js';

configure({ enforceActions: 'always' });
class DashboardState {
  @observable showUnDefined: boolean = true;

  @action changeShowUnDefined(status: boolean): void {
    this.showUnDefined = status;
  }

  @computed get getChartOption(): any {
    if (this.showUnDefined) {
      return {
        ...analysisOptions
      };
    } else {
      return this.filterUnDefined({
        ...analysisOptions
      });
    }
  }

  propertyList: Array<string> = ['legend', 'series', 'xAxis'];

  filterUnDefined<T>(obj: T): T {
    const _obj: T = cloneDeep(obj);
    for (let op in _obj) {
      const chartOption: any = _obj[op];
      this.propertyList.forEach(res => {
        chartOption[res] && (chartOption[res] = this.filterProperty(chartOption[res]));
      });
    }
    return _obj;
  }

  filterProperty<T>(property: any): T {
    if (Array.isArray(property)) {
      if (property.length < 3) {
        property[0].data.shift();
        property[1].data.shift();
      } else {
        property[0].data = [];
      }
    } else {
      property.data = property.data.filter((res: any) => {
        return res.name ? res.name !== '未识别' : res !== '未识别';
      });
    }
    return property;
  }
}

export default DashboardState;
