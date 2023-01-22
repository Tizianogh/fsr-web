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

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  listOfGroups: any;
  appState$: Observable<State<Response<ContactGroups>>>;
  readonly stateEnum = StateEnum;

  private dataSubject = new BehaviorSubject<Response<ContactGroups>>(null);

  constructor(private contactGroupService: GroupsService) {}

  ngOnInit(): void {
    this.appState$ = this.contactGroupService.get$().pipe(
      map((response) => {
        this.dataSubject.next(response);
        return {
          state: this.stateEnum.LOADED_STATE,
          appData: {
            ...response,
            data: {
              results: response.data.results,
            },
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
    this.appState$ = this.contactGroupService.get$().pipe(
      map((response) => {
        this.dataSubject.next(response);
        return {
          state: this.stateEnum.LOADED_STATE,
          appData: {
            ...response,
            data: {
              results: response.data.results,
            },
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
