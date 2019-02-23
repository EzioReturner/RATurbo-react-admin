import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import './header.scss';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date()
		};
	}
	componentDidMount() {
		this.timerID = setInterval(() => {
			this.tick();
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({ date: new Date() });
	}
	getMenu = () => (
		<Menu>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.alipay.com/"
				>
					1st menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.taobao.com/"
				>
					2nd menu item
				</a>
			</Menu.Item>
			<Menu.Item>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="http://www.tmall.com/"
				>
					3rd menu item
				</a>
			</Menu.Item>
		</Menu>
	);
	render() {
		const { date } = this.state;
		return (
			<div className="userInfo">
				<span>{date.toLocaleTimeString()}</span>
				<Dropdown
					style={{
						marginLeft: '20px'
					}}
					overlay={this.getMenu()}
				>
					<div>
						<Icon type="user" className="userIcon" />
						<span>zhev</span>
					</div>
				</Dropdown>
			</div>
		);
	}
}

@inject('layoutStore')
@observer
class Header extends Component {
	constructor(props) {
		super(props);
	}
	handleClick(query, e) {
		// console.log(this, query, e)
	}
	render() {
		const { toggleCollapsed, collapsed } = this.props.layoutStore;
		const iconCollapsed = collapsed ? 'menu-unfold' : 'menu-fold';
		return (
			<div
				className={classNames('header', {
					collapsed: collapsed
				})}
			>
				<Icon
					type={iconCollapsed}
					className="foldIcon"
					onClick={() => toggleCollapsed()}
				/>
				<UserInfo />
			</div>
		);
	}
}
export default Header;
