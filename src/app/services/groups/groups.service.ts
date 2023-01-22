import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ContactGroups } from 'src/app/models/ContactGroups';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private readonly apiUrl = `${environment.APIEndpoint}`;
  constructor(private http: HttpClient) {}

  get$ = (idContact: string = '1') =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .get<Response<ContactGroups>>(
          `${this.apiUrl}/groups/contact/${idContact}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => error);
  }
}
