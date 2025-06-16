import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishingDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/Books`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number) {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book) {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateBook(book: Book) {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }
}
