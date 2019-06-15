import React, { Component } from 'react';
import { Router, Redirect } from "@reach/router";
import { inject, observer } from 'mobx-react';
import Error404 from 'views/Exception/404';
import AsyncComponent from '../AsyncComponent';

@inject('layoutStore')
@observer
class ReachRouter extends Component {
  generateRoute(routes) {
    return routes ? [...routes, { unMatch: true }].map((route, i) => {
      const {
        redirect,
        path,
        routes,
        component,
        key,
        unMatch
      } = route;
      const childRoutes = this.generateRoute(routes);
      if (unMatch) {
        return <Error404 default key={'unMatch' + Math.random().toString(36).slice(2)} />
      }
      if (redirect) {
        return (
          <Redirect
            key={key || i}
            from={path}
            to={redirect}
          />
        )
      }
      return (
        component ?
          <AsyncComponent
            componentInfo={component}
            key={key || i}
            path={path}
            route={route}
          >
            {childRoutes}
          </AsyncComponent> :
          childRoutes
      )
    }) : null;
  }
  render() {
    const {
      layoutStore: { routeConfig }
    } = this.props;
    return (
      <Router>
        {this.generateRoute(routeConfig)}
      </Router>
    );
  }
}

export default ReachRouter;