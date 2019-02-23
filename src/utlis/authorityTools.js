export function getAuthority(str) {
	// return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
	const authorityString =
		typeof str === 'undefined' ? localStorage.getItem('ra-authority') : str;
	// authorityString could be admin, "admin", ["admin"]
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

export function setAuthority(authority) {
	const proAuthority = typeof authority === 'string' ? [authority] : authority;
	localStorage.setItem('ra-authority', JSON.stringify(proAuthority));
}

export function clearAuthority() {
	localStorage.removeItem('ra-authority');
}
