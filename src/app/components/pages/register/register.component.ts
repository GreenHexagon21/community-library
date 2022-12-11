import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponseData } from 'src/app/shared/authresponsedata';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerMode = false;
  isAuth = false;
  pwd!: string;
  error: string = "";
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  switchMode() {
    this.registerMode = !this.registerMode;
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  registerOrLogin() {
    let authObs: Observable<AuthResponseData | HttpErrorResponse>;
    if (!this.registerForm.valid) {
      return;
    }

    const username = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    authObs = this.authService.login(username, password);

    authObs.subscribe(
      resData => {
        if (resData instanceof HttpErrorResponse) {
          console.log(resData.error);
        } else {
          this.router.navigate(['/main']);
        }
      },
    );

    this.registerForm.reset();


  }

}
