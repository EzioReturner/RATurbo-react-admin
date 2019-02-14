import { observable, configure, action, computed } from 'mobx';
import { cloneDeep } from 'lodash';
import {
	circleOption,
	barOption,
	cityOption,
	provinceOption
} from '@utlis/chartOption.js';

configure({ enforceActions: 'always' });
class DashboardState {
	@observable showUnDefined = true;

	@action changeShowUnDefined(status) {
		this.showUnDefined = status;
	}

	@computed get getChartOption() {
		if (this.showUnDefined) {
			return {
				circleOption,
				barOption,
				cityOption,
				provinceOption
			};
		} else {
			return this.filterUnDefined({
				circleOption,
				barOption,
				cityOption,
				provinceOption
			});
		}
	}

	propertyList = ['legend', 'series', 'xAxis'];

	filterUnDefined(obj) {
		const _obj = cloneDeep(obj);
		for (let op in _obj) {
			const chartOption = _obj[op];
			this.propertyList.forEach(res => {
				chartOption[res] &&
					(chartOption[res] = this.filterProperty(chartOption[res]));
			});
		}
		return _obj;
	}

	filterProperty(property) {
		if (Array.isArray(property)) {
			property[0].data.shift();
			property[1].data.shift();
		} else {
			property.data = property.data.filter(res => {
				return res.name ? res.name !== '未识别' : res !== '未识别';
			});
		}
		return property;
	}
}

const dashboardState = new DashboardState();

export default dashboardState;
