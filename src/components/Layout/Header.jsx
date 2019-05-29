import React, { Component } from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
import UserInfo from './UserInfo';

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
				className={classNames(
					styles.header,
					collapsed ? styles.collapsed : '',
					isMobile ? styles.isMobile : ''
				)}
			>
				<Icon
					type={iconCollapsed}
					className={styles.foldIcon}
					onClick={() => toggleCollapsed()}
				/>
				<div className={styles.rightPart}>
					<UserInfo />
					<SelectLang />
				</div>
			</div>
		);
	}
}
export default Header;
