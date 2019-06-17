import React, { Component } from 'react';
import { Router, Redirect } from "@reach/router";
import { inject, observer } from 'mobx-react';
import Error404 from 'views/Exception/404';
import AsyncComponent from '../AsyncComponent';
import RelayLayout from 'layout/RelayLayout';

@inject('layoutStore')
@observer
class ReachRouter extends Component {
  generateRoute(routes) {
    return routes ? routes.map((route, i) => {
      const {
        redirect,
        path,
        routes,
        component,
        key,
        unMatch
      } = route;
      const childRoutes = routes ? this.generateRoute(routes) : null;
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
          <RelayLayout
            path={path}
            key={key || i}
          >
            {childRoutes}
          </RelayLayout>
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