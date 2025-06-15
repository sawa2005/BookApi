import { Component, OnInit } from '@angular/core';
import { Quote, QuoteService } from '../services/quote.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotes.html',
  styleUrls: ['./quotes.scss'],
})
export class Quotes implements OnInit {
  quotes: Quote[] = [];
  quoteForm: FormGroup;
  error = '';

  constructor(private quoteService: QuoteService, private fb: FormBuilder) {
    this.quoteForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => (this.quotes = quotes),
      error: (err) => console.error(err),
    });
  }

  addQuote() {
    if (this.quoteForm.invalid) return;

    this.quoteService.addQuote(this.quoteForm.value).subscribe({
      next: (quote) => {
        this.quotes.push(quote);
        this.quoteForm.reset();
        this.error = '';
      },
      error: (err) => {
        this.error = err.error.message || 'Could not add quote.';
      },
    });
  }

  deleteQuote(id: number) {
    if (!confirm('Delete this quote?')) return;

    this.quoteService.deleteQuote(id).subscribe(() => {
      this.quotes = this.quotes.filter((q) => q.id !== id);
    });
  }
}
