import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import './header.scss';

const confirm = Modal.confirm;
@withRouter
@inject('userStore')
@observer
class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			showTime: false
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => {
			this.tick();
		}, 1000);
		const { userInfo, reloadUserInfo } = this.props.userStore;
		if (JSON.stringify(userInfo) === '{}') {
			reloadUserInfo();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({ date: new Date() });
	}

	handleLogout = () => {
		confirm({
			maskClosable: true,
			title: 'confirm to logout',
			content: 'user info will reset, system cannot auto-login',
			onOk: () => {
				return new Promise((resolve, reject) => {
					const { history, userStore } = this.props;
					setTimeout(() => {
						userStore.userLogout();
						history.push('/user/login');
						resolve();
					}, 800);
				}).catch(() => console.log('Oops errors!'));
			},
			onCancel() {}
		});
	};

	handleTriggerError = () => {
		this.props.history.push('/exception/home');
	};

	getMenu = () => (
		<Menu className="headerDropdown">
			<Menu.Item>
				<Icon type="user" />
				<span>user info</span>
			</Menu.Item>
			<Menu.Item onClick={this.handleTriggerError}>
				<Icon type="setting" />
				<span>trigger error</span>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={this.handleLogout}>
				<Icon type="logout" />
				<span>logout</span>
			</Menu.Item>
		</Menu>
	);

	handleShowTime = () => {
		this.setState({
			showTime: !this.state.showTime
		});
		setTimeout(() => {
			this.state.showTime && this.handleShowTime();
		}, 3000);
	};

	render() {
		const { date, showTime } = this.state;
		const { name } = this.props.userStore.userInfo;
		return (
			<div className="userInfo">
				<span className="clock">
					<Icon type="clock-circle" onClick={this.handleShowTime} />
					<span className={classNames('text', { showTime })}>
						{date.toLocaleTimeString()}
					</span>
				</span>
				<Dropdown className="drop-down" overlay={this.getMenu()}>
					<div className="userDropdown">
						<Icon type="user" className="userIcon" />
						<span className="text">{name}</span>
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

	render() {
		const { toggleCollapsed, collapsed, isMobile } = this.props.layoutStore;
		const iconCollapsed = collapsed ? 'menu-unfold' : 'menu-fold';
		return (
			<div
				className={classNames('header', {
					collapsed,
					isMobile
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
