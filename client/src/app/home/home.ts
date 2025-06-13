import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [BookService],
})
export class Home implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');

    // Load books from the service
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (err) => console.error('Error loading books:', err),
    });

    // Initialize the book form
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishingDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const newBook = this.bookForm.value as Book;
    this.bookService.addBook(newBook).subscribe({
      next: (book) => {
        this.books.push(book);
        this.bookForm.reset();
      },
      error: (err) => console.error('Error adding book:', err),
    });
  }
}
