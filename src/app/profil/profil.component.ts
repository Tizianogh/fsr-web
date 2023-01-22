import { Component } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { Response } from 'src/app/models/Response';
import { StateEnum } from '../enum/state.enum';
import { Contact } from '../models/Contact';
import { State } from '../models/State';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
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

  ngOnChanges(): void {
    console.log('here');
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
  addInputRow() {
    const form = document.getElementById('add-contact-from');

    form.innerHTML += `<div>
            <input class="for-button-delete" type="text" name="profil-phone[]" id="profil-phone" placeholder="Numero">
            <a onclick="this.parentNode.remove()" class="button error button-delete"><img class="trash-icon" src="/assets/icons/svg/trash.svg" alt="Supprimer"></a>
        </div>`;
  }
}
