import { AuthService } from 'src/app/services/auth.service';
import { CommunicationService } from './../../../../services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from './../../../../shared/book';
import { Status } from 'src/app/shared/status';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit,OnDestroy {
  id : number
  currentUser :User;
  private userSub: Subscription;
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    ISBN: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    description: new FormControl('')
  })

  constructor(private communicationService: CommunicationService, private authService:AuthService) {
    this.id = communicationService.getCurrentId()
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.currentUser = user;
    });
  }

  addBook() {
    var addedBook : Book  = {id: this.id,
      title: this.bookForm.get('title').value ,
      author: this.bookForm.get('author').value,
      status: Status.Ready,
      ISBN:this.bookForm.get('ISBN').value,
      rating:0,
      image: this.bookForm.get('image').value,
      description:this.bookForm.get('description').value,
      addedBy: this.currentUser.id
    }
    this.communicationService.addBook(addedBook)
    this.id = this.communicationService.getCurrentId()
    this.currentUser.books.push(addedBook)
  }

}
