import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

const STORAGE_ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  trackAuthState(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log('trackAuthState', user);
    });
  }

  // Checks user login status
  isSignedIn(): boolean {
    const accessToken: string = localStorage.getItem(STORAGE_ACCESS_TOKEN);
    return accessToken ? true : false;
  }

  haddleSocialLoginResult(value: SocialUser): void {
    if (!value) {
      return;
    }
    console.log(value);

    localStorage.setItem(STORAGE_ACCESS_TOKEN, value.idToken);
  }

  signInWithGoogle(navigateUrl?: string): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((value) => {
        this.haddleSocialLoginResult(value);
        console.log(navigateUrl);
        if (navigateUrl) {
          this.router.navigate([navigateUrl]);
        }
      })
      .catch((error) => {
        // to-do
      });
  }

  clearStorage(): void {
    localStorage.clear();
  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.clearStorage();
  }
}
