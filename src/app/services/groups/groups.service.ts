import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Contact } from 'src/app/models/Contact';
import { ContactGroups } from 'src/app/models/ContactGroups';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private readonly apiUrl = `${environment.APIEndpoint}`;
  constructor(private http: HttpClient) {}

  getOfContact$ = (idContact: string = '1') =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .get<Response<ContactGroups>>(
          `${this.apiUrl}/groups/contact/${idContact}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  get$ = () =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .get<Response<ContactGroups>>(`${this.apiUrl}/groups`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  getGroupById$ = (idGroup: string = '1') =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .get<Response<ContactGroups>>(`${this.apiUrl}/groups/${idGroup}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  deleteUserGroup$ = (idGroup) =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .get<Response<ContactGroups>>(`${this.apiUrl}/cg/delete/${idGroup}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );
  create$ = (idGroup: string, contactGroup: ContactGroups) =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .post<Response<ContactGroups>>(
          `${this.apiUrl}/cg/new/${idGroup}`,
          contactGroup
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  addContactToGroup$ = (idGroup: string, contact: Contact) =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .post<Response<ContactGroups>>(
          `${this.apiUrl}/cg/add/${idGroup}`,
          contact
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  deleteContactGroup$ = (idGroup: string) =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .delete<Response<Contact>>(`${this.apiUrl}/cg/delete/${idGroup}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  deleteUserOfGroup$ = (idGroup: string, contact: Contact) =>
    <Observable<Response<ContactGroups>>>(
      this.http
        .post<Response<ContactGroups>>(
          `${this.apiUrl}/cg/remove/${idGroup}`,
          contact
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => error);
  }
}
