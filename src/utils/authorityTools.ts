/**
 * 获取权限
 * @param {str} string 未处理的权限
 * @return {authority} {Array<string>} 权限结果
 */
export function getAuthority(str?: string | string[]) {
  const authorityString =
    typeof str === 'undefined' ? window.localStorage.getItem('RA-authority') : str;
  let authority;
  try {
    // @ts-ignore
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

/**
 * 设置权限
 * @param {authority} string|array 权限
 */
export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  window.localStorage.setItem('RA-authority', JSON.stringify(proAuthority));
}

// 清除权限
export function clearAuthority() {
  window.localStorage.removeItem('RA-authority');
}

/**
 * 获取路由权限
 * @param {pathname} string 路由路径
 * @return {routeAuthority} {string} 路由对应权限
 */
export function getRouteAuthority(pathname: string, routes: RouteRoot[] = []) {
  let routeAuthority: undefined | string | string[];
  const _getAuthority = (pathname: string, _routes: RouteRoot[]) => {
    _routes.forEach(_route => {
      if (pathname === _route.path) {
        routeAuthority = _route.authority;
      } else if (_route.routes) {
        routeAuthority = _getAuthority(pathname, _route.routes);
      }
    });
    return routeAuthority;
  };
  return _getAuthority(pathname, routes);
}
