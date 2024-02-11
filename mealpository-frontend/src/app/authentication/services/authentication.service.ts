import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn: boolean = false;

  constructor(
    private http: HttpClient
  ) {  
   }
  
  login(email: string, password: string): Observable<any> {
    const loginURL = 'http://127.0.0.1:8000/authentication/login';
    const requestBody = { email, password };
    return this.http.post(loginURL, requestBody);
  }

  /*
  signup(firstName: string, email: string, password: string): Observable<any> {
    
  }
  */

  verifyToken(authToken: string): Observable<any> {
    const verifyURL = 'http://127.0.0.1:8000/authentication/test_token'
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + authToken
    });
    return this.http.get(verifyURL, { headers });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(bool: boolean): void {
    this.loggedIn = bool;
  }

}
