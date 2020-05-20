import React, { Suspense } from 'react';
import Authorized from '@components/Authorized';
import { getRouteAuthority } from '@utils/authorityTools';
import Loading from '@components/Loading';
import { useLocation } from 'react-router-dom';

const Exception403 = React.lazy(() => import(/* webpackChunkName: "403" */ '@views/Exception/403'));

const ViewContent: React.FC<{ route: RouteRoot }> = props => {
  let location = useLocation();
  const { route, children } = props;
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  return (
    <Authorized
      routeAuthority={routeAuthority}
      unidentified={
        <Suspense fallback={<Loading spinning />}>
          <Exception403 />
        </Suspense>
      }
    >
      <main className="RA-basicLayout-wrapper-viewMain">{children}</main>
    </Authorized>
  );
};

export default ViewContent;
