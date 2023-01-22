import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { ContactGroups } from '../models/ContactGroups';
import { GroupsService } from '../services/groups/groups.service';
import { Response } from 'src/app/models/Response';
import { StateEnum } from '../enum/state.enum';
import { State } from '../models/State';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  test() {
    console.log('test');
  }
  appState$: Observable<State<Response<ContactGroups>>>;
  readonly stateEnum = StateEnum;
  contact: any;
  private dataSubject = new BehaviorSubject<Response<ContactGroups>>(null);
  randomColor: string;
  constructor(
    private contactGroupService: GroupsService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    console.log('cent');
    this.appState$ = this.contactGroupService.getGroupById$().pipe(
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

  color() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.randomColor = color;
  }
}
