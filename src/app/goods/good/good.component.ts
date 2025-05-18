import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Good } from '../interfaces/good.model';
import { GoodsService } from '../goods.service';
import { GoodsFirebaseService } from '../goodsFirebase.service';

@Component({
  selector: 'app-good',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './good.component.html',
  styleUrl: './good.component.css',
})
export class GoodComponent {
  good = input.required<Good>();

  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);

  removeGood(): void {
    this.goodsFirebaseService.removeGood(this.good().id).subscribe(() => {
      this.goodsService.removeGood(this.good().id);
    });
  }
}
