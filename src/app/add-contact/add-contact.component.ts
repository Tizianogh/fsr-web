import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { StateEnum } from '../enum/state.enum';
import { Contact } from '../models/Contact';
import { ContactGroups } from '../models/ContactGroups';
import { Response } from '../models/Response';
import { State } from '../models/State';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  addContactForm: FormGroup;
  appState$: Observable<State<Response<Contact>>>;
  readonly stateEnum = StateEnum;

  private dataSubject = new BehaviorSubject<Response<Contact>>(null);

  constructor(
    private _formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
    this.addContactForm = this._formBuilder.group({
      profilLastname: new FormControl('', [Validators.required]),
      profilName: new FormControl('', [Validators.required]),
      profilEmail: new FormControl('', [Validators.required]),
      profilAdressStreet: new FormControl('', [Validators.required]),
      profilAdressCity: new FormControl('', [Validators.required]),
      profilAddressZip: new FormControl('', [Validators.required]),
      profilAddressCountry: new FormControl('', [Validators.required]),
      aliases: this._formBuilder.array([this._formBuilder.control('')]),
    });
  }

  get aliases() {
    return this.addContactForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this._formBuilder.control(''));
  }

  //TODO REPARER LE REMOVE
  removeQuantity(i: number) {
    this.aliases.removeAt(i);
  }

  submitFormAddContact(addContactForm: FormGroup) {
    let contact: Contact = {
      lastName: addContactForm.value.profilLastname,
      firstName: addContactForm.value.profilName,
      address: {
        rue: addContactForm.value.profilAdressStreet,
        ville: addContactForm.value.profilAdressCity,
        departement: addContactForm.value.profilAddressZip,
        pays: addContactForm.value.profilAddressCountry,
      },
      phones: addContactForm.value.aliases,
      email: addContactForm.value.profilEmail,
    };

    this.contactService.create$(contact).subscribe({
      next: (response) => {
        this.dataSubject.next(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get f() {
    return this.addContactForm.controls;
  }

  // addInputRow() {
  //   const form = document.getElementById('add-contact-from');

  //   form.innerHTML += `<div>
  //               <input class="for-button-delete" type="text" name="profil-phone[]" id="profil-phone" placeholder="Numero">
  //               <a onclick="this.parentNode.remove()" class="button error button-delete"><img class="trash-icon" src="/assets/icons/svg/trash.svg" alt="Supprimer"></a>
  //           </div>`;
  // }
}
