import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import routeConfig from '../../config/router.config';
import { intersection } from 'lodash';
import { RLogo } from '@components/SvgIcon';
import styles from './siderMenu.module.scss';

import classNames from 'classnames';

const { SubMenu } = Menu;
const _routes = routeConfig[1].routes;
@withRouter
@inject('layoutStore', 'userStore')
@observer
class SiderMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: []
		};
	}

	componentDidMount() {
		this.initOpenMenu();
	}

	// 检查路由是否匹配信息表
	checkRoute(routeInfo, path) {
		const isArr = Array.isArray(routeInfo);
		const arr = isArr ? routeInfo : routeInfo.routes;
		return arr.find(
			route => route.path === (isArr ? '' : routeInfo.path) + '/' + path
		);
	}

	// 初始化开启的菜单
	initOpenMenu() {
		const {
			location: { pathname }
		} = this.props;
		let cacheRoute;
		const menuOpen = pathname.split('/').reduce((total, path) => {
			if (path) {
				cacheRoute = this.checkRoute(cacheRoute || _routes, path);
				cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
			}
			return total;
		}, []);
		this.setState({
			openKeys: [...menuOpen]
		});
	}

	getMenuTitle(iconType, name) {
		return (
			<span>
				{iconType && <Icon type={iconType} />}
				<span>{name}</span>
			</span>
		);
	}

	getNavMenuItem(menuData) {
		if (!menuData.length) {
			return [];
		}
		const { authority: currentAuthority } = this.props.userStore;
		return menuData
			.filter(menu => {
				const { authority, hideMenu } = menu;
				if (!hideMenu) {
					if (!authority) return true;
					const allowed = intersection(currentAuthority, authority);
					return allowed.length > 0;
				}
				return false;
			})
			.map(res => this.getSubMenuOrItem(res));
	}

	getSubMenuOrItem(menu) {
		if (
			menu.routes &&
			!menu.hideMenu &&
			menu.routes.some(child => child.name)
		) {
			const { icon, name, path, routes } = menu;
			return (
				<SubMenu title={this.getMenuTitle(icon, name)} key={path}>
					{this.getNavMenuItem(routes)}
				</SubMenu>
			);
		}
		return <Menu.Item key={menu.path}>{this.getMenuItem(menu)}</Menu.Item>;
	}

	handleClickLink(name, path) {
		const { isMobile, toggleCollapsed, setOpenMenus } = this.props.layoutStore;
		// setOpenMenus(name, path);
		isMobile && toggleCollapsed();
	}

	getMenuItem(menu) {
		const { icon: iconType, name, path } = menu;
		return (
			<Link
				to={path}
				replace
				onClick={() => {
					this.handleClickLink(name, path);
				}}
			>
				{iconType && <Icon type={iconType} />}
				<span>{name}</span>
			</Link>
		);
	}

	handleOpenMenu = openKeys => {
		const moreThanOne =
			openKeys.filter(key => _routes.some(route => route.path === key)).length >
			1;
		if (this.props.layoutStore.collapsed && !openKeys.length) {
			return;
		}
		this.setState({
			openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
		});
	};
	handleLinkGithub() {
		window.open('https://github.com/EzioReturner/RATurbo-react-admin');
	}

	render() {
		const {
			location: { pathname }
		} = this.props;
		const { collapsed } = this.props.layoutStore;
		const menuProps = collapsed ? {} : { openKeys: this.state.openKeys };
		return (
			<div
				className={classNames(
					styles.navigator,
					collapsed ? styles.collapsed : ''
				)}
				mode="inline"
			>
				<div className={styles.controlBut} onClick={this.handleLinkGithub}>
					<div className={styles.rotateIcon}>
						<Icon component={RLogo} className={styles.logoBorder} />
					</div>
					<span className={`ml-3 ${styles.title}`}>RA-TURBO</span>
				</div>
				<Menu
					className="myMenu"
					mode="inline"
					inlineCollapsed={collapsed}
					selectedKeys={[pathname]}
					onOpenChange={this.handleOpenMenu}
					{...menuProps}
				>
					{this.getNavMenuItem(_routes)}
				</Menu>
			</div>
		);
	}
}

export default SiderMenu;
