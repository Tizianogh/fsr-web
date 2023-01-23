import { Component, Input } from '@angular/core';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  randomColor: string;
  @Input() contact: Contact;
  listOfGroups: any;

  ngOnInit(): void {
    this.color();
  }

  color() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.randomColor = color;
  }
}
