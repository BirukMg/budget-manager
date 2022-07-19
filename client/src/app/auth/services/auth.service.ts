import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ACCESS_TOKEN = 'auth_token';
  private EXPIRES_AT = 'expires_at';

  constructor(private http: HttpClient, private router: Router) { }

  url(suffix: string) {
    const baseUrl: string = environment.apiHost;
    return `${baseUrl}/${suffix}${suffix ? '/' : ''}`;
  }

  register(data: {username: string, password: string}) {
    return this.http.post(this.url('user/register'), data);
  }
  login(data: {username: string, password: string}) {
    return this.http.post<{token: string}>(this.url('user/login'), data);
  }

  public decodeToken(token: string) {
    return new JwtHelperService().decodeToken(token);
  }

  public storeToken(token: string) {
    const decodedToken = this.decodeToken(token);
    const expiresAt = moment.unix(decodedToken.exp);

    localStorage.setItem(this.ACCESS_TOKEN, token);
    localStorage.setItem(this.EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));

    this.router.navigateByUrl(`/`);
  }

  public getToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  logout() {
    // Remove user from local storage
    localStorage.removeItem(this.ACCESS_TOKEN);
    this.router.navigateByUrl('/auth');
    window.location.reload(); 
    // this.userSubject.next(null);
  }

  isLoggedIn() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();
    const isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
}
