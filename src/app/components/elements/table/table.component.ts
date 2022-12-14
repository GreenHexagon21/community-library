import { Book } from './../../../shared/book';
import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/status';
import { CommunicationService } from 'src/app/services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  tableBooks : Book[];

  constructor(private communicationService: CommunicationService, private router: Router) {}

  ngOnInit(): void {
    this.communicationService.getBooksFromAPI().subscribe(data => {
      this.tableBooks = data;
    })
  }


  navToBook(id:number) {
    this.router.navigate(['book/' + id]);
  }
/*
  books : Book[] = [{
    id: 1,
    title: "Cooking with E621",
    author: "Varka Falkrus",
    status: Status.Ready,
    ISBN: "58913E",
    rating: 5.0,
    image: "",
    description: "The spice of life in book form"
  },
  {
    id: 2,
    title: "Dragon taming manual",
    author: "Byzil Sylazor",
    status: Status.Ready,
    ISBN: "163283E",
    rating: 5.0,
    image: "",
    description: "How to train your dragons but better"
  }
]
*/
}
