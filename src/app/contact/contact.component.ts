import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/Contact';
import { PhoneService } from '../services/phone/phone.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  deleteContactNum: FormGroup;

  randomColor: string;
  @Input() contact: Contact;
  listOfGroups: any;

  ngOnInit(): void {
    this.color();
  }
  constructor(
    private _formBuilder: FormBuilder,
    private phoneService: PhoneService
  ) {
    this.deleteContactNum = this._formBuilder.group({
      idPhone: new FormControl('', [Validators.required]),
    });
  }

  submitDeleteNum(formNumDelete: FormGroup) {
    let idPhone = formNumDelete.value.idPhone;
    this.phoneService.delete$(idPhone).subscribe((response) => {
      console.log(response);
    });
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
