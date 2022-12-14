import { CommunicationService } from './../../../../services/communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/shared/book';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent  implements OnInit{
  id:number;
  book:Book;
  owner: User;


  constructor( private route: ActivatedRoute, private communicationService: CommunicationService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    this.communicationService.getBookFromAPI(this.id).subscribe(data => {
      this.book = data;
      this.communicationService.getUserFromAPI(this.book.addedBy).subscribe(u => {
        this.owner = u;
        console.log(u);
      })
    })
  }

}
