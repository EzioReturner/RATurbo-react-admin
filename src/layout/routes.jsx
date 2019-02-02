import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import Dashboard from '@pages/Dashboard/Index';
import Map from '@pages/Map/Index';
import Monitor from '@pages/Analysis/Monitor';
import Platform from '@pages/Analysis/Platform';
import '@style/layout/routeContent.scss';
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Routes extends Component {
  render() {
    const {location} = this.props;
    return (
      <div className="routeContent">
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={800} key={location.pathname}>
            <Switch location={location}>
              <Route exact={true} path="/" render={() => (<Redirect to="/dashboard"/>)}/>
              <Route exact={true} path="/dashboard" component={Dashboard}/>
              <Route exact={true} path="/map" component={Map}/>
              <Route exact={true} path="/analysis/monitor" component={Monitor}/>
              <Route exact={true} path="/analysis/platform" component={Platform}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default Routes;
