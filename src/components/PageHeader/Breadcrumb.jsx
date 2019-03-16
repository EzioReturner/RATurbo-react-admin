import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './pageHeader.module.scss';

@inject('layoutStore')
@observer
class BreadCrumb extends Component {
	render() {
		return <div>BreadCrumb</div>;
	}
}

export default BreadCrumb;
