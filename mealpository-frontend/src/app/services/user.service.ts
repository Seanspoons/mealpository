import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getUserInfo(): Observable<any> {
    //const userInfoURL = 'http://127.0.0.1:8000/authentication/user_info';
    const userInfoURL = 'http://192.168.1.88:8000/authentication/user_info';
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.authenticationService.getToken()
    });
    return this.http.get(userInfoURL, { headers });
  }
  
}
