/**
 * 获取权限
 * @param {str} string 未处理的权限
 * @return {authority} {Array<string>} 权限结果
 */
export function getAuthority(str) {
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('ra-authority') : str;
  let authority;
  try {
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
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('ra-authority', JSON.stringify(proAuthority));
}

// 清除权限
export function clearAuthority() {
  localStorage.removeItem('ra-authority');
}

/**
 * 获取路由权限
 * @param {pathname} string 路由路径
 * @return {routeAuthority} {string} 路由对应权限
 */
export function getRouteAuthority(pathname, routes) {
  let routeAuthority = null;
  const _getAuthority = (pathname, _routes) => {
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
