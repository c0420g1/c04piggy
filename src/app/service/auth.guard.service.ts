import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.tokenStorageService.getToken();
    // decode the token to get its payload
    // const tokenPayload = this.tokenStorageService.getAuthorities();

    if (token == null) {
      this.router.navigateByUrl('/login');
      return false;
    }
    // else
    // if (
    //     !token ||
    //     tokenPayload !== expectedRole
    // ) {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
    return true;
  }
}
