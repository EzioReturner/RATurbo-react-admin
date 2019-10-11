import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Error404 from '@views/Exception/404';
import AsyncComponent from '../AsyncComponent';
import LayoutStore from '@store/layoutStore';
import { RouteConfig } from '@models/index';

/**
 * 路由生成组件
 * 遍历路由表 生成多级路由
 */

interface InjectedProps {
  layoutStore: LayoutStore;
}

interface RouteMiddleProps {
  path: string;
  exact?: boolean;
  strict?: boolean;
  render: Function;
  key: string | number;
}

interface RouteMiddleRouteProps extends RouteMiddleProps, RouteComponentProps {}

const RenderRoutes: React.FC = props => {
  const injected = () => {
    return props as InjectedProps;
  };

  const RouteMiddle = (rmProps: RouteMiddleProps) => {
    const routeInfo = () => {
      return rmProps as RouteMiddleRouteProps;
    };
    const { location } = routeInfo();
    const { path, exact, strict, render, ...rest } = rmProps;
    return (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={props => render({ ...props, ...rest })}
      />
    );
  };
  const generateRoute = (routes: RouteConfig[], switchProps?: any) => {
    return routes ? (
      <Switch {...switchProps}>
        {routes.map((route: any, i: number) => {
          const {
            redirect,
            path,
            exact,
            strict,
            routes: child,
            component,
            key
            // withAuthority,
            // authority,
            // name
          } = route;
          if (redirect) {
            return (
              <Redirect key={key || i} from={path} to={redirect} exact={exact} strict={strict} />
            );
          }
          return (
            <RouteMiddle
              key={i}
              path={path}
              exact={exact}
              strict={strict}
              render={(props: any) => {
                const childRoutes = generateRoute(child, {
                  location: props.location
                });
                if (component) {
                  return (
                    <AsyncComponent componentInfo={component} route={route}>
                      {childRoutes}
                    </AsyncComponent>
                  );
                } else {
                  return childRoutes;
                }
              }}
            />
          );
        })}
        <Route component={Error404} />
      </Switch>
    ) : null;
  };

  const {
    layoutStore: { routeConfig }
  } = injected();
  return <Router>{generateRoute(routeConfig)}</Router>;
};

export default inject('layoutStore')(observer(RenderRoutes));
