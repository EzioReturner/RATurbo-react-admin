export function getAuthority(str: any): Array<string> {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString: any =
    typeof str === 'undefined' ? localStorage.getItem('ra-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority: any;
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

export function setAuthority(authority: any): void {
  const proAuthority: any = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('ra-authority', JSON.stringify(proAuthority));
}
