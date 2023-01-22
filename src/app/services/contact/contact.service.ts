import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Contact } from 'src/app/models/Contact';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly apiUrl = `${environment.APIEndpoint}`;
  constructor(private http: HttpClient) {}

  get$ = <Observable<Response<Contact>>>(
    this.http
      .get<Response<Contact>>(`${this.apiUrl}/contacts`)
      .pipe(tap(console.log), catchError(this.handleError))
  );

  create$ = (contact: Contact) =>
    <Observable<Response<Contact>>>(
      this.http
        .post<Response<Contact>>(`${this.apiUrl}/contact/new`, contact)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  getByID$ = (idContact: string = '1') =>
    <Observable<Response<Contact>>>(
      this.http
        .get<Response<Contact>>(
          `${this.apiUrl}/retrieve/contact/id/${idContact}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => error);
  }
}
