import { Injectable } from '@angular/core';

const STORAGE_ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Checks user login status
  isSignedIn(): boolean {
    const accessToken: string = localStorage.getItem(STORAGE_ACCESS_TOKEN);

    return !accessToken;
  }
}
