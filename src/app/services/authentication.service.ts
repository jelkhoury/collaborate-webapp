import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { UserManager } from 'oidc-client';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthenticationService {
    private userManager: UserManager;

    // Observable sources
    private userLoggedInSource = new Subject<string>();
    private userLoggedOutSource = new Subject();
    // Observable streams
    userLoggedIn$ = this.userLoggedInSource.asObservable();
    userLoggedOut$ = this.userLoggedOutSource.asObservable();

    constructor(private router: Router, @Inject('ORIGIN_URL') private originUrl: string) {
        var config = {
            authority: "http://localhost:5557",
            client_id: "sc.js",
            redirect_uri: location.origin + "/signin-callback",
            response_type: "id_token token",
            scope: "openid profile scapi id role",
            post_logout_redirect_uri: location.origin,
            automaticSilentRenew: true,
            silent_redirect_uri: location.origin + '/silent-renew-callback'
        };

        this.userManager = new UserManager(config);
    }

    continueSignin() {
        var current = this;

        this.userManager.signinRedirectCallback().then(function (user) {
            current.userLoggedInSource.next();
            if (user.state) {
                current.router.navigateByUrl(user.state);
            } else {
                current.router.navigateByUrl('home');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
    continueSilentRenew() {
        Oidc.Log.logger = console;
        Oidc.Log.level = Oidc.Log.INFO;

        this.userManager.signinSilentCallback();
    }
    login(redirectUrl: string) {
        this.userManager.signinRedirect({
            data: redirectUrl
        });
    }
    logout(): void {
        this.userManager.signoutRedirect();
        this.userLoggedOutSource.next();
    }
    ensureAuthenticatedAsync(redirectUrl: string): Observable<boolean> {
        var current = this;

        return Observable.create(observer => {
            this.userManager.getUser().then(function (user) {
                if (user == null) {
                    current.login(redirectUrl);
                }
                observer.next(user != null);
                observer.complete();
            });
        });
    }
    ensureRoleAsync(roleName: string, redirectUrl: string): Observable<boolean> {
        var current = this;

        return Observable.create(observer => {
            this.userManager.getUser().then(function (user) {
                var result = false;

                if (user == null) {
                    current.login(redirectUrl);
                }
                debugger;
                var roles: string[] = user.profile.role;
                if (roles && roles.length > 0) {
                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].toLocaleLowerCase() == roleName.toLocaleLowerCase()) {
                            result = true;
                            break;
                        }
                    }
                }

                observer.next(result);
                observer.complete();
            });
        });
    }
    getCurrentUserAsync(): Observable<Oidc.User> {
        return Observable.create(observer => {
            this.userManager.getUser().then(function (user) {
                observer.next(user);
                observer.complete();
            });
        });
    }
    getAccessTokenAsync(): Observable<string> {
        var current = this;

        return Observable.create(observer => {
            this.userManager.getUser().then(function (user) {
                let access_token = '';

                if (user != null) {
                    access_token = user.access_token;
                }
                observer.next(access_token);
                observer.complete();
            });
        });
    }
}