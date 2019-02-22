import React, { Component } from 'react';

/**
 * 权限检查
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string | array} authority
 * @param { 当前权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } unAuthor
 */
export const CheckPermission = (
	authority,
	currentAuthority,
	Target,
	Unidentified
) => {
	console.log(authority, currentAuthority, Target, Unidentified);
	if (!authority) {
		return Target;
	}
	if (Array.isArray(authority)) {
		if (authority.indexOf(currentAuthority) >= 0) {
			return Target;
		}
		if (Array.isArray(currentAuthority)) {
			for (let i = 0; i < currentAuthority.length; i += 1) {
				const element = currentAuthority[i];
				if (authority.indexOf(element) >= 0) {
					return Target;
				}
			}
		}
		return Unidentified;
	}
	if (typeof authority === 'string') {
		if (authority === 'all') {
			return currentAuthority ? Target : Unidentified;
		}

		if (authority === currentAuthority) {
			return Target;
		}
		if (Array.isArray(currentAuthority)) {
			for (let i = 0; i < currentAuthority.length; i += 1) {
				const element = currentAuthority[i];
				if (authority === element) {
					return Target;
				}
			}
		}
		return Unidentified;
	}
	throw new Error('unsupported parameters');
};
