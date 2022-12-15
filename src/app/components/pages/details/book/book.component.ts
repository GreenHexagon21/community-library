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
  owned: boolean = true;
  currentUser : User;
  loaded: boolean = false;
  rating : number;


  constructor( private route: ActivatedRoute, private communicationService: CommunicationService) {

  }
  async ngOnInit(): Promise<void> {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    await this.communicationService.getBookFromAPI(this.id).then( data => {
      this.book = data;
    })
    await this.communicationService.getUserFromAPI(this.book.addedBy).then(u => {
      this.owner = u;
    })
    this.loaded = true;
    if(this.owner.id != this.currentUser.id) {
      this.owned = false;
    }
  }

}
