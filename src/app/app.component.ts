import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { ContactGroups } from './models/ContactGroups';
import { GroupsService } from './services/groups/groups.service';
import { Response } from 'src/app/models/Response';
import { StateEnum } from './enum/state.enum';
import { State } from './models/State';
import { StorageService } from './services/storage/storage.service';
import { ContactService } from './services/contact/contact.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from './models/Contact';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  putContact: FormGroup<any>;

  addContactForm: FormGroup<any>;

  listContact: Contact[];

  listContactGroup: ContactGroups[];

  title = 'fsr-webapp';
  appState$: Observable<State<Response<ContactGroups>>>;
  readonly stateEnum = StateEnum;
  contact: any;
  private dataSubject = new BehaviorSubject<Response<ContactGroups>>(null);
  randomColor: string;
  deleteContactFrom: FormGroup;
  deleteGroupFrom: FormGroup;

  constructor(
    private contactGroupService: GroupsService,
    private storage: StorageService,
    private contactService: ContactService,
    private _formBuilder: FormBuilder
  ) {
    this.addContactForm = this._formBuilder.group({
      libelleGroupe: new FormControl('', [Validators.required]),
      idContact: new FormControl('', [Validators.required]),
    });

    this.putContact = this._formBuilder.group({
      idContact: new FormControl('', [Validators.required]),
      idGroup: new FormControl('', [Validators.required]),
    });

    this.deleteContactFrom = this._formBuilder.group({
      idContact: new FormControl('', [Validators.required]),
    });

    this.deleteGroupFrom = this._formBuilder.group({
      idGroup: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.contactGroupService.get$().subscribe((response) => {
      this.listContactGroup = response.data.results;
    });

    this.contactService.get$.subscribe((response) => {
      this.listContact = response.data.results;
      console.table(this.listContact);
    });
  }

  submitFormAddContactGroup(addContactForm: FormGroup) {
    let groupe: ContactGroups = {
      libelle: addContactForm.value.libelleGroupe,
    };

    this.contactGroupService
      .create$(addContactForm.value.idContact, groupe as ContactGroups)
      .subscribe((response) => {
        console.warn(response);
      });

    this.addContactForm.reset();
  }

  submitPut(putContact: FormGroup) {
    let contact: Contact = {
      email: putContact.value.idContact as string,
    };

    this.contactGroupService
      .addContactToGroup$(putContact.value.idGroup, contact)
      .subscribe((response) => {
        console.warn(response);
      });
  }

  submitDeleteContactForm(deleteUserForm: FormGroup) {
    let idContact = deleteUserForm.value.idContact;
    this.contactService.delete$(idContact).subscribe((response) => {
      console.warn(response);
    });
  }

  submitDeleteGroup(deleteGroupForm: FormGroup) {
    let idGroup = deleteGroupForm.value.idGroup;
    this.contactGroupService
      .deleteContactGroup$(idGroup)
      .subscribe((response) => {
        console.warn(response);
      });
  }

  createGroup: boolean;
  deleteGroup: boolean;
  createContact: boolean;
  updateContact: boolean;
  deleteContact: boolean;
  deleteNumeros: boolean;
  deleteContactGroup: boolean;
  putContactGroup: boolean;
  createBean: boolean;

  toggle(element: string) {
    this.createGroup = false;
    this.deleteGroup = false;
    this.createContact = false;
    this.updateContact = false;
    this.deleteContact = false;
    this.deleteNumeros = false;
    this.deleteContactGroup = false;
    this.putContactGroup = false;
    this.createBean = false;
    switch (element) {
      case 'createGroup':
        this.createGroup = true;
        break;
      case 'deleteGroup':
        this.deleteGroup = true;
        break;
      case 'createContact':
        this.createContact = true;
        break;
      case 'updateContact':
        this.updateContact = true;
        break;
      case 'deleteContact':
        this.deleteContact = true;
        break;
      case 'deleteNumeros':
        this.deleteNumeros = true;
        break;
      case 'deleteContactGroup':
        this.deleteContactGroup = true;
        break;
      case 'putContactGroup':
        this.putContactGroup = true;
        break;
      case 'deleteBean':
        this.contactService.bean$().subscribe((response) => {
          console.log(response);
        });
        break;
      default:
        break;
    }
  }
}
