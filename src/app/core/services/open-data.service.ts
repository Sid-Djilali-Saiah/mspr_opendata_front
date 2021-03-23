import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpenDataService {
  apiUrl = 'https://api-opendata.nonstopintegration.ml';

  private static handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = { error: error.error.message };
    } else {
      // Server-side errors
      errorMessage = { error: error.message };
    }
    return of(errorMessage);
  }

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/opendata/`).pipe(catchError(OpenDataService.handleError));
  }

  download(dataIds: Array<number>): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http
      .post(
        `${this.apiUrl}/api/opendata/pdf`,
        {
          ids: dataIds,
        },
        { headers, responseType: 'blob' as 'json' },
      )
      .pipe(catchError(OpenDataService.handleError));
  }
}
