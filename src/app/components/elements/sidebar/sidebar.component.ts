import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
    this.items = [{
        label: 'Options',
        items: [{
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
            }
        }
        ]},
        {
            label: 'Navigate',
            items: [{
                label: 'Angular',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ]}
    ];
}
}
