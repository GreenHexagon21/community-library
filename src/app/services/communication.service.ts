import { Book } from './../shared/book';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private currentId:number = 0;
  private books : Book[] = [];

  constructor() { }

  getCurrentId() {
    return this.currentId;
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


}
