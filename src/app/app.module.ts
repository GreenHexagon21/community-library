import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/elements/sidebar/sidebar.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MainComponent } from './components/pages/main/main.component';
import { BookComponent } from './components/pages/details/book/book.component';
import { UserComponent } from './components/pages/details/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    RegisterComponent,
    MainComponent,
    BookComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
