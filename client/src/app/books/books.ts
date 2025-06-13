import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.scss',
  providers: [BookService],
})
export class Books implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (err) => console.error('Error loading books:', err),
    });
  }
}
