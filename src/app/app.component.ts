import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './goods/categories/categories.component';
// import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kids-goods-app';
}
