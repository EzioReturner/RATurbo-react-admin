import React, {Component} from 'react';
import '@style/main.scss';
import Header from './header';
import Navigator from './navigator';
import Routes from './routes';
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
