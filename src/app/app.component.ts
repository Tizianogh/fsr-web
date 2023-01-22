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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fsr-webapp';
  appState$: Observable<State<Response<ContactGroups>>>;
  readonly stateEnum = StateEnum;
  contact: any;
  private dataSubject = new BehaviorSubject<Response<ContactGroups>>(null);
  randomColor: string;
  constructor(
    private contactGroupService: GroupsService,
    private storage: StorageService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactGroupService.get$().subscribe((response) => {
      console.table(response);
    });

    this.contactService.get$.subscribe((response) => {
      console.table(response);
    });
  }

  test() {
    console.log('test');
  }
}
