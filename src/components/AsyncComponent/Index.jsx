import React, { Component } from 'react';
import WrapComponent from '@components/WarpAnimation/Index';

export default function asyncComponent(importComponent) {
	class AsyncComponent extends Component {
		constructor(props) {
			super(props);

			this.state = {
				component: null
			};
		}

		async componentDidMount() {
			this.props.store.startSpinning();
			const { default: component } = await importComponent();
			this.setState({
				component: component
			});
			this.props.store.stopSpinning();
		}

		render() {
			const C = this.state.component;
			return C ? (
				<WrapComponent>
					<C {...this.props} />
				</WrapComponent>
			) : null;
		}
	}

	return AsyncComponent;
}
