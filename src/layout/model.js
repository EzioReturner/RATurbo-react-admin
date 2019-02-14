import { observable, configure, action, computed, autorun } from 'mobx';

configure({ enforceActions: 'always' });
class MainState {
	@observable spinning = true;
	@observable fixed = false;
	@observable mountLoading = true;
	@observable readyInitializers = [];
	timeout = null;
	constructor() {
		// autorun(() => this.checkIsInitial(this.componentPath));
	}

	@action stopSpinning() {
		this.spinning = false;
		this.timeout && clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.unMountLoading();
		}, 600);
	}

	@action unMountLoading() {
		this.mountLoading = false;
	}

	@action addInitializer(initializer) {
		this.readyInitializers.push(initializer);
		this.mountLoading = true;
		this.spinning = true;
	}

	@action checkIsInitial(path) {
		!this.readyInitializers.includes(path) && this.addInitializer(path);
	}
}

const mainState = new MainState();

export default mainState;
