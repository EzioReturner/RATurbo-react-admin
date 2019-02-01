import React, {Component} from 'react';
import '@style/layout/main.scss';
import Header from './Header';
import Navigator from './Navigator';
import Routes from './Routes';
import {BrowserRouter as Router} from "react-router-dom";

class Main extends Component {
  render() {
    return (<Router>
      <div className="main">
        <Header/>
        <div className="container">
          <Navigator/>
          <Routes/>
        </div>
      </div>
    </Router>);
  }
}

export default Main;
