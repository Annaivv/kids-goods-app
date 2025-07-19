import { Routes } from '@angular/router';
import { GoodsComponent } from './goods/goods.component';
import { CategoryItemsComponent } from './goods/category-items/category-items.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: GoodsComponent,
  },
  {
    path: 'categories/:categoryName',
    component: CategoryItemsComponent,
  },
  { path: 'auth', component: AuthComponent },
];
