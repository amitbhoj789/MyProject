import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Observable, Subject} from "rxjs";

const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com', // Url of the Identity Provider
    strictDiscoveryDocumentValidation: false, // strict discovery document disallows urls which not start with issuers url
    redirectUri: window.location.origin, // URL of the SPA to redirect the user to after login
    clientId: '1005295762563-tqe4mde4klarbr1fneh6tg15r4v6c1a2.apps.googleusercontent.com',
    scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly', // set the scope for the permissions the client should request
    showDebugInformation: true,
}

export interface UserInfo {
    info: {
        sub: string
        email: string,
        name: string,
        picture: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class GoogleApiService {

    gmail = 'https://gmail.googleapis.com'
    userProfileSubject = new Subject<UserInfo>()
    constructor(
        private readonly oAuthService: OAuthService,
        private readonly httpClient: HttpClient
    ) {
        oAuthService.configure(authCodeFlowConfig);
        oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";
        oAuthService.loadDiscoveryDocument().then( () => {
            oAuthService.tryLoginImplicitFlow().then( () => {
                if (!oAuthService.hasValidAccessToken()) {
                    oAuthService.initLoginFlow();
                } else {
                    oAuthService.loadUserProfile().then( (userProfile) => {
                        this.userProfileSubject.next(userProfile as UserInfo)
                        console.log(JSON.stringify(userProfile))
                    })
                }
            })
        })
    }

    emails(userId: string): Observable<any> {
        return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
    }

    getMail(userId: string, mailId: string): Observable<any> {
        return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
    }

    isLoggedIn(): boolean {
        return this.oAuthService.hasValidAccessToken()
    }

    signOut() {
        this.oAuthService.logOut()
    }

    private authHeader() : HttpHeaders {
        return new HttpHeaders ({
            'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
        })
    }
}
