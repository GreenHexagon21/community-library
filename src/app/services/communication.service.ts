import { Book } from './../shared/book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BookDTO } from '../shared/book-dto';
import { firstValueFrom } from 'rxjs';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private currentId:number = 0;
  private books : Book[] = [];
  url = "http://localhost:5224/api"

  constructor(private http: HttpClient) { }

  getCurrentId() {
    return this.currentId;
  }
  getBooksFromAPI(){
    return this.http.get<Book[]>(this.url+"/Books");
  }
  getBookFromAPI(id:number) {
    return this.http.get<Book>(this.url+"/Books/"+id);
  }
  postBooktoAPI(book:BookDTO) {
    return firstValueFrom(this.http.post(this.url + "/Books", book));
  }

  getBooks() {
    return this.books;
  }

  addBook(book:Book) {
    this.currentId++;
    this.books.push(book);
  }

  getBook(id) {
    return this.books.find(x => x.id == id);
  }

  getUsersFromApi() {
    return this.http.get<User[]>(this.url+"/users");
  }
  loginUserUsingAPI(username: string, password:string) {
    return this.http.post(this.url+"/users/login",{Username:username,Password:password});
  }
  registerUserUsingApi(username:string, password: string) {
    return this.http.post(this.url+"/users",{Username:username,Password:password});
  }
  getUserFromAPI(id:number) {
    return this.http.get<User>(this.url+"/users/"+id);
  }

}
