import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quotes } from './quotes/quotes';
import { Login } from './login/login';
import { Books } from './books/books';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'quotes', component: Quotes },
  { path: 'login', component: Login },
  { path: 'books', component: Books },
];
