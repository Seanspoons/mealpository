import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn: boolean;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    const token = this.getToken();
    if(token) {
      this.loggedIn = true;
      console.log("Logged In in auth");
    } else {
      this.loggedIn = false;
      console.log("Not Logged In in auth");
    }
   }
  
  login(email: string, password: string): Observable<any> {
    //const loginURL = 'http://127.0.0.1:8000/authentication/login';
    const loginURL = 'http://192.168.1.88:8000/authentication/login';
    const requestBody = { email, password };
    return this.http.post(loginURL, requestBody);
  }

  logout(token: string): Observable<any> {
    //const logoutURL = 'http://127.0.0.1:8000/authentication/logout';
    const logoutURL = 'http://192.168.1.88:8000/authentication/logout';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
    //console.log("Logging out");
    return this.http.post(logoutURL, {}, httpOptions);
  }

  signup(first_name: string, email: string, password: string): Observable<any> {
    //const signupURL = 'http://127.0.0.1:8000/authentication/signup';
    const signupURL = 'http://192.168.1.88:8000/authentication/signup';
    const requestBody = { first_name, email, password };
    return this.http.post(signupURL, requestBody);
  }

  verifyToken(authToken: string): Observable<any> {
    //const verifyURL = 'http://127.0.0.1:8000/authentication/test_token'
    const verifyURL = 'http://192.168.1.88:8000/authentication/test_token'
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + authToken
    });
    return this.http.get(verifyURL, { headers });
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getUserID(): string {
    return this.cookieService.get('user_id');
  }

  setToken(authToken: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours in milliseconds
    this.cookieService.set('token', authToken, expirationDate);
  }

  setUserID(user_id: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours in milliseconds
    this.cookieService.set('user_id', user_id, expirationDate);
  }

  deleteToken(): void {
    this.cookieService.delete('token');
  }

  deleteUserID(): void {
    this.cookieService.delete('user_id');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(bool: boolean): void {
    this.loggedIn = bool;
  }

}
