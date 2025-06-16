import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService, Book } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class EditBook implements OnInit {
  editForm!: FormGroup;
  bookId!: number;
  editingId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookService,
    public router: Router
  ) {}

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishingDate: [''],
    });

    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.editForm.patchValue(book);
    });
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    const updatedBook: Book = {
      id: this.bookId,
      ...this.editForm.value,
    };

    this.bookService.updateBook(updatedBook).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
