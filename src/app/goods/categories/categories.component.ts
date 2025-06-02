import { Component } from '@angular/core';
import { Category } from '../../interfaces/category.model';
import { APP_CATEGORIES } from '../../constants/app.constants';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = APP_CATEGORIES;
}
