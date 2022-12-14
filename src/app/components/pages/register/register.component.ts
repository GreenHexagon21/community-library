import { CommunicationService } from 'src/app/services/communication.service';
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

  alreadyRegistered = false;
  isAuth = false;
  pwd!: string;
  error: string = "";
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router,private communicationService:CommunicationService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  registerOrLogin() {

    const username = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.communicationService.getUsersFromApi().subscribe(data => {
      let finder = data.find(u => u.username == username)
      if (finder) {
        this.communicationService.loginUserUsingAPI(username,password).subscribe(user => {
          localStorage.setItem('currentUser', JSON.stringify(user))
        });
      } else {
        this.communicationService.registerUserUsingApi(username,password).subscribe(
          reg => {
            //console.log(reg);
          }
        );

      }
    })
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['main']);
    }
    this.registerForm.reset();


  }

}
