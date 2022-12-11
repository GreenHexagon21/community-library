import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/elements/table/table.component';
import { AddBookComponent } from './components/pages/add/add-book/add-book.component';
import { BookComponent } from './components/pages/details/book/book.component';
import { MainComponent } from './components/pages/main/main.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddBookComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main',
    component: TableComponent
  },
  {
    path:'book/:id',
    component: BookComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
