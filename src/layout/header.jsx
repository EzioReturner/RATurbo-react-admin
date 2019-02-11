import React, { Component } from 'react';
import '@style/layout/header.scss';
import { Icon } from 'antd';

class Clock extends Component {
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
	render() {
		const { date } = this.state;
		return (
			<div className="clock">
				{date.toLocaleTimeString()}
				<span
					style={{
						marginLeft: '20px'
					}}
				>
					<Icon type="user" className="userIcon" />
					zhev
				</span>
			</div>
		);
	}
}

class Header extends Component {
	constructor(props) {
		super(props);
	}
	handleClick(query, e) {
		// console.log(this, query, e)
	}
	render() {
		return (
			<div className="header">
				<div className="controlBut">
					<Icon type="bars" />
				</div>
				<span className="title" onClick={this.handleClick.bind(this, 'hahah')}>
					REACT-TURBO
				</span>
				<Clock />
			</div>
		);
	}
}
export default Header;
