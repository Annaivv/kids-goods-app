import { Component } from '@angular/core';
import { Category } from '../../interfaces/category.model';
import { APP_CATEGORIES } from '../../constants/app.constants';

@Component({
  selector: 'app-category-items',
  standalone: true,
  imports: [],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css',
})
export class CategoryItemsComponent {
  readonly categories: Category[] = APP_CATEGORIES;
}
