import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [BookService],
})
export class Home implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (err) => console.error('Error loading books:', err),
    });
  }
}
