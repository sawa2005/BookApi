import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quote {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5255/api/Quotes';

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
