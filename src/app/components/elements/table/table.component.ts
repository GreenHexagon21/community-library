import { Book } from './../../../shared/book';
import { Component, Input } from '@angular/core';
import { Status } from 'src/app/shared/status';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

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

}
