import React, { PureComponent } from 'react';
import WrapAnimation from '@components/WrapAnimation/Index';
import { inject } from 'mobx-react';

export default function asyncComponent(componentInfo) {
	@inject('layoutStore')
	class AsyncComponent extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				component: null,
				animate: null
			};
		}

		async componentDidMount() {
			const [asyncComponent, path, animate] = componentInfo();
			this.props.layoutStore.checkIsInitial(path);
			const { default: component } = await asyncComponent;
			this.setState({
				component: component,
				animate: animate
			});
		}

		render() {
			const { component: C, animate } = this.state;
			if (animate === 'notAnimate') {
				return <C {...this.props} />;
			}
			return C ? (
				<WrapAnimation animate={animate}>
					<C {...this.props} />
				</WrapAnimation>
			) : null;
		}
	}

	return AsyncComponent;
}
