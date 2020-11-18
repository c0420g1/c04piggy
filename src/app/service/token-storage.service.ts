import { Injectable } from '@angular/core';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const USERID_KEY = 'AuthUserid';
const AUTHORITIES_KEY = 'AuthAuthorities';
const IMAGE_KEY = 'AuthImage';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }

  public getAuthorities(): string {
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }
  public saveUserid(userid: string) {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, userid);
  }
  public getUserid(): string {
    return sessionStorage.getItem(USERID_KEY);
  }

  public saveImageUrl(imageUrl: string) {
    window.sessionStorage.removeItem(IMAGE_KEY);
    window.sessionStorage.setItem(IMAGE_KEY, imageUrl);
  }
  public getImageUrl(): string {
    return sessionStorage.getItem(IMAGE_KEY);
  }
}
