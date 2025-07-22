import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { firebaseConfig } from '../app.config';
import { ErrorHandlingService } from './error-handling.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private authErrorService: ErrorHandlingService
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) =>
          this.authErrorService.handleAuthError(errorRes)
        )
      );
  }
}
