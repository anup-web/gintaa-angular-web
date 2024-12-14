import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  set(name, value, expires, path, domain, secure, sameSite = 'Lax') {
    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires = new Date(
          new Date().getTime() + expires * 1000 * 60 * 60 * 24
        );
        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }
    if (path) {
      cookieString += 'path=' + path + ';';
    }
    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }
    if (secure === false && sameSite === 'None') {
      secure = true;
    }
    if (secure) {
      cookieString += 'secure;';
    }
    cookieString += 'sameSite=' + sameSite + ';';
    document.cookie = cookieString;
  }

  get(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;
    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }

        // if(ca[i].indexOf(name, 0) > -1) {
        //     c = ca[i].substring(cookieName.length + 1, ca[i].length);
        //     console.log('value cookie: ', c);
        //     return c;
        // }
    }
    return '';
  }
}
