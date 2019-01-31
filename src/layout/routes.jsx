import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import Dashboard from '@pages/dashboard/index';
import Map from '@pages/map/index';
import '@style/routeContent.scss';
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Routes extends Component {
  render() {
    const location = this.props.location;
    return (<div className="routeContent">
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={800} key={location.key}>
          <Switch location={location}>
            <Route exact={true} path="/" render={() => (<Redirect to="/dashboard"/>)}/>
            <Route exact={true} path="/dashboard" component={Dashboard}/>
            <Route exact={true} path="/map" component={Map}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>)
  }
}

export default withRouter(Routes);
