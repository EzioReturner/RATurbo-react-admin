/**
 * 权限检查
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string | array} authority
 * @param { 当前权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } unAuthor
 */
import React from 'react';

export type IAuthorityType = undefined | string | string[];

const CheckPermission = <T, K>(
  routeAuthority: IAuthorityType,
  currentAuthority: string | string[],
  Target: T,
  Unidentified: K
): T | K | React.ReactNode => {
  if (!currentAuthority || currentAuthority.length === 0 || currentAuthority[0] === 'unIdentify') {
    return Unidentified;
  }
  if (!routeAuthority) {
    return Target;
  }
  if (Array.isArray(routeAuthority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => routeAuthority.includes(item))) {
        return Target;
      }
    } else if (routeAuthority.includes(currentAuthority)) {
      return Target;
    }
    return Unidentified;
  }
  if (typeof routeAuthority === 'string') {
    if (routeAuthority === 'all') {
      return currentAuthority ? Target : Unidentified;
    }

    if (routeAuthority === currentAuthority) {
      return Target;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (routeAuthority === element) {
          return Target;
        }
      }
    }
    return Unidentified;
  }
  throw new Error('unsupported parameters');
};

export default CheckPermission;
