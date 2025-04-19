import { Component, inject } from '@angular/core';
import { GoodsService } from './goods.service';

@Component({
  selector: 'app-goods',
  imports: [],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css',
})
export class GoodsComponent {
  goodsService = inject(GoodsService);
}
