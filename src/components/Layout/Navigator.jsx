import React from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types'
import SiderMenu from './SiderMenu';

const Navigater = (props) => {
	const { isMobile, collapsed, toggleCollapsed } = props;
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

Navigater.propTypes = {
	isMobile: PropTypes.bool,
	collapsed: PropTypes.bool,
	toggleCollapsed: PropTypes.func,
}

export default Navigater;
