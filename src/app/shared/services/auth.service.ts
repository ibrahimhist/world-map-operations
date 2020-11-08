import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

const STORAGE_ACCESS_TOKEN = 'access_token';
const STORAGE_USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  loggedIn: boolean;

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.user = this.getUser();
    this.isLoggedIn.next(this.isSignedIn());
  }

  trackAuthState(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.isLoggedIn.next(this.loggedIn);
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

    localStorage.setItem(STORAGE_ACCESS_TOKEN, value.idToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(value));
  }

  getUser(): User {
    const user = this.user || JSON.parse(localStorage.getItem(STORAGE_USER));
    return user;
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
    this.isLoggedIn.next(false);
    this.user = null;
    this.router.navigate(['/sign-out-success']);
  }
}
