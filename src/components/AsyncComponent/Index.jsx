import React, { Component } from 'react';
import WrapComponent from '@components/WarpAnimation/Index';
import { inject } from 'mobx-react';

export default function asyncComponent(componentInfo) {
	@inject('layoutStore')
	class AsyncComponent extends Component {
		constructor(props) {
			super(props);

			this.state = {
				component: null
			};
		}

		async componentDidMount() {
			const [asyncComponent, path] = componentInfo();
			this.props.layoutStore.checkIsInitial(path);
			const { default: component } = await asyncComponent;
			this.setState({
				component: component
			});
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
