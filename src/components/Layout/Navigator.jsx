import React, { Component } from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

class Navigater extends Component {
	render() {
		const { isMobile, collapsed, toggleCollapsed } = this.props;
		return isMobile ? (
			<Drawer
				visible={!collapsed}
				placement="left"
				closable={false}
				onClose={() => toggleCollapsed()}
				style={{
					padding: 0,
					height: '100vh'
				}}
				bodyStyle={{
					padding: 0
				}}
			>
				<SiderMenu />
			</Drawer>
		) : (
			<SiderMenu />
		);
	}
}
export default Navigater;
