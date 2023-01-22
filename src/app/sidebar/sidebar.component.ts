import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  groups= true;
  contacts = false;
  profil = false;
  toggle(element: string) {
      switch (element) {
          case 'groups':
              this.groups = true;
              this.contacts = false;
              this.profil = false;
              break;
          case 'contacts':
              this.groups = false;
              this.contacts = true;
              this.profil = false;
              break;
          case 'profil':
              this.groups = false;
              this.contacts = false;
              this.profil = true;
              break;
      }
  }
}
