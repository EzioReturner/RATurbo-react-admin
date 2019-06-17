import React, { PureComponent } from 'react';
import WrapAnimation from 'components/WrapAnimation';
import { inject } from 'mobx-react';

/**
 * 懒加载模块
 * @param {componentInfo} object 懒加载模块信息
 * componentInfo 内部参数
 * {asyncComponent} 动态import的方法
 * {animate} 动画名称
 * {path} 校验路径
 */
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
		const {
			componentInfo: [componentPath, animate],
			route
		} = this.props;
		// 检查路径是否已加载 判断是否显示loading
		const { checkIsInitial, stopSpinning } = this.props.layoutStore;
		checkIsInitial(route);
		const { default: component } = await import('../../../src' + componentPath);
		this.setState({
			component: component,
			animate: animate
		});
		if (animate === 'notAnimate') {
			stopSpinning();
		}
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
export default AsyncComponent;
