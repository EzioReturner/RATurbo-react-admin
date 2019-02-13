import { observable, configure, action, computed } from 'mobx';

class MainState {
	@observable spinning = true;
	@observable fixed = false;
	@observable mountLoading = true;
	timeout = null;

	@action stopSpinning() {
		this.spinning = false;
	}
	@action startSpinning() {
		this.spinning = true;
	}
	@action triggerMountLoading() {
		this.mountLoading = true;
	}
	@action triggerUnMountLoading() {
		setTimeout(() => {
			this.mountLoading = false;
		}, 5000);
	}
}

const mainState = new MainState();

export default mainState;
