import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { Response } from 'src/app/models/Response';
import { StateEnum } from '../enum/state.enum';
import { Contact } from '../models/Contact';
import { State } from '../models/State';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  listOfGroups: any;
  appState$: Observable<State<Response<Contact>>>;
  readonly stateEnum = StateEnum;
  private dataSubject = new BehaviorSubject<Response<Contact>>(null);

  constructor(private contactService: ContactService) {}
  ngOnInit(): void {
    this.appState$ = this.contactService.get$.pipe(
      map((response) => {
        this.dataSubject.next(response);
        return {
          state: this.stateEnum.LOADED_STATE,
          appData: {
            ...response,
            data: { results: response.data.results.reverse() },
          },
        };
      }),
      startWith({ state: this.stateEnum.LOADING_STATE }),
      catchError((error: string) => {
        return of({ state: this.stateEnum.ERROR_STATE, error });
      })
    );
  }
}
