export const setCookie = (cname, cvalue, exhours) => {
  const expires = `expires=${new Date(Date.now() + exhours * 60 * 60 * 1000).toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export const getCookie = (cname) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }

  return '';
};

export const deleteCookie = (cname) => {
  document.cookie = `${cname}=;${new Date().toUTCString()};path=/`;
};
export const get_cookie = (name) => {
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
}
export const delete_cookie = ( name, path, domain ) => {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}