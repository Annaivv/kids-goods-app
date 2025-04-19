import { Component } from '@angular/core';
import { GoodsComponent } from './goods/goods.component';

@Component({
  selector: 'app-root',
  imports: [GoodsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kids-goods-app';
}
