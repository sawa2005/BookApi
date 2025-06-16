import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [BookService],
})
export class Home implements OnInit {
  books: Book[] = [];
  editForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize editForm with empty fields
    this.editForm = this.fb.group({
      title: [''],
      author: [''],
      publishingDate: [''],
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (books) => (this.books = books),
      error: (err) => console.error('Error loading books:', err),
    });
  }

  startEdit(book: Book) {
    this.editingId = book.id;
    this.editForm.patchValue({
      title: book.title,
      author: book.author,
      publishingDate: book.publishingDate.split('T')[0], // input[type="date"] format
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit() {
    if (this.editingId !== null) {
      const updatedBook: Book = {
        id: this.editingId,
        ...this.editForm.value,
      };

      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.cancelEdit();
        this.loadBooks();
      });
    }
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
    }
  }
}
