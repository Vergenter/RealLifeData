import { curry} from 'ramda';

export const setCookie=curry((cname, cvalue, exseconds)=> {
  const d = new Date();
  d.setTime(d.getTime() + (exseconds * 1000));
  const expires = 'expires='+d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
});
export const getCookie=(cname)=> {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};