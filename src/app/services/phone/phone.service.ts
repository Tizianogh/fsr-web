import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { PhoneNum } from 'src/app/models/PhoneNum';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';
@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private readonly apiUrl = `${environment.APIEndpoint}`;
  constructor(private http: HttpClient) {}

  delete$ = (idPhone: string) =>
    <Observable<Response<PhoneNum>>>(
      this.http
        .delete<Response<PhoneNum>>(`${this.apiUrl}/phone/delete/${idPhone}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => error);
  }
}
