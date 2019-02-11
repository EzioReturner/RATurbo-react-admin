import React, { Component } from "react";
import "@style/layout/main.scss";
import Header from "./Header";
import Navigator from "./Navigator";
import Routes from "./Routes";
// import {BrowserRouter as Router, Route} from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends Component {
	render() {
		return (
			<Router>
				<Route
					render={({ location }) => (
						<div className="main">
							<Header />
							<div className="container">
								<Navigator location={location} />
								<Routes location={location} />
							</div>
						</div>
					)}
				/>
			</Router>
		);
	}
}

export default Main;
