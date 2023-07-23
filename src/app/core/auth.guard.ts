import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, UrlSegment, Route} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Observable, takeUntil} from 'rxjs';
import {ConfigService} from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(public _authService: AuthService, private router: Router, public config: ConfigService) {}

    loginEmail: any;
    loginToken: any;

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // check if route is restricted by admin email
        this.loginToken = localStorage.getItem('loginToken');
        this.loginEmail =  localStorage.getItem('loginEmail');
        if (this.loginToken && this.loginEmail === this.config.adminEmail || this.loginEmail === this.config.testingEmail) {
            return true;
        } else {
            return false;
        }

    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise <boolean> | boolean {
        this.loginToken = localStorage.getItem('loginToken');
        this.loginEmail =  localStorage.getItem('loginEmail');
        if (this.loginToken && this.loginEmail === this.config.adminEmail || this.loginEmail === this.config.testingEmail) {
            return true;
        } else {
            return false;
        }
    }
}

