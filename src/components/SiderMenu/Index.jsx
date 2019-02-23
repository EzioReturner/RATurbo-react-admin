import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import routeConfig from '../../config/router.config';

const { SubMenu } = Menu;
const _routes = routeConfig[1].routes;
@inject('layoutStore')
@withRouter
@observer
class SiderMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: props.layoutStore.openMenus
		};
	}

	componentDidMount() {
		this.initOpenMenu();
	}

	initOpenMenu() {
		const {
			location: { pathname }
		} = this.props;
		const menuOpen = pathname.split('/').reduce((total, obj) => {
			obj &&
				_routes.some(route => route.path === '/' + obj) &&
				total.push('/' + obj);
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
		return menuData
			.filter(menu => !menu.hideMenu)
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

	getMenuItem(menu) {
		const { icon: iconType, name, path } = menu;
		return (
			<Link to={path} replace>
				{iconType && <Icon type={iconType} />}
				<span>{name}</span>
			</Link>
		);
	}

	handleOpenMenu = openKeys => {
		const moreThanOne =
			openKeys.filter(key => _routes.some(route => route.path === key)).length >
			1;
		if (this.props.collapsed && !openKeys.length) {
			return;
		}
		this.setState({
			openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
		});
	};
	render() {
		const {
			location: { pathname }
		} = this.props;
		const { collapsed } = this.props.layoutStore;
		const menuProps = collapsed ? {} : { openKeys: this.state.openKeys };
		return (
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
		);
	}
}

export default SiderMenu;
