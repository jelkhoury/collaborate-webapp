import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (state.root.firstChild.url[0].path == 'management') {
            return this.authService.ensureRoleAsync('admin', state.url);
        }
        else {
            return this.authService.ensureAuthenticatedAsync(state.url);
        }
    }
}