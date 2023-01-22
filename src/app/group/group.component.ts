import { Component, Input } from '@angular/core';
import { ContactGroups } from '../models/ContactGroups';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  @Input() group: ContactGroups;
}