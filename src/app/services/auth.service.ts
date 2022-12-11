import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { AuthResponseData } from '../shared/authresponsedata';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    let authres: AuthResponseData | HttpErrorResponse
      if(username == "hex@hex.com" && password=="knotted") {

         authres = {
          idToken: "111",
          username: "hex",
          refreshToken: "ref",
          expiresIn: "1000000",
          localId:  "222",
          registered: true
        }
        this.handleAuthentication(authres.username,authres.localId,authres.idToken,+authres.expiresIn);
      } else {
        authres = new HttpErrorResponse({
                            error: 'No such user',
                            headers: undefined,
                            status: 500,
                            statusText: 'Warning',
                            url: undefined
        })

      }

      return of(authres);
  }

  autoLogin() {
    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/register']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    if(username !== "err") {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(username, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
      this.user.subscribe(console.log);
    }
   console.log("Bad login!")
  }
}
