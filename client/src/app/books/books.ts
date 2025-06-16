import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrl: './books.scss',
  providers: [BookService],
})
export class Books implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize bookForm with validation
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishingDate: ['', Validators.required],
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (err) => console.error('Error loading books:', err),
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const newBook = this.bookForm.value as Book;
    this.bookService.addBook(newBook).subscribe({
      next: (book) => {
        this.books.push(book);
        this.bookForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error adding book:', err),
    });
  }
}
