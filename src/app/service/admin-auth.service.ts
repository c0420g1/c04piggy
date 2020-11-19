import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router,private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.tokenStorageService.getToken();
    // decode the token to get its payload
    const tokenPayload = this.tokenStorageService.getAuthorities();

    if (token == null) {
      this.router.navigateByUrl('/login');
      return false;
    }
    else
    if (
        !token ||
        tokenPayload !== expectedRole
    ) {
      this.router.navigateByUrl('/dashboard');
      this.toastr.error('You do not permission to Admin Page', '403');
      return false;
    }
    return true;
  }
}
