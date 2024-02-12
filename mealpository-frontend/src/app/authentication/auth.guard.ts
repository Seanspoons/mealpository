import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
    ) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    if (this.authenticationService.isLoggedIn()) {
        console.log("auth guard says logged in");
        return true;
    } else {
        console.log("auth guard says not logged in");
        return this.router.createUrlTree(['/login']);
    }
  }
}