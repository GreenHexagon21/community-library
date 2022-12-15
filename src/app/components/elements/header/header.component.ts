import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuth = false;
  loaded = false;
  private userSub: Subscription;

  constructor(private authService:AuthService) { }

  ngOnDestroy(): void {
     this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuth = !!localStorage.getItem('currentUser')
    this.loaded = true;
  }
  logout() {
    localStorage.removeItem('currentUser')
    this.isAuth = false;
  }


}
