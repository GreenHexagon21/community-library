import { CommunicationService } from './../../../../services/communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/shared/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent  implements OnInit{
  id:number;
  book:Book;


  constructor( private route: ActivatedRoute, private communicationService: CommunicationService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    this.book = this.communicationService.getBook(this.id);
  }

}
