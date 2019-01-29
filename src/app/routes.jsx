import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Content from './homepage/index';
import 'style/routeContent.scss';

class Routes extends Component {
  render() {
    return (<div className="routeContent">
      <Route exact={true} path="/" render={() => (<Redirect to="/dashboard"/>)}/>
      <Route exact={true} path="/dashboard" component={Content}/>
    </div>)
  }
}

export default Routes;
