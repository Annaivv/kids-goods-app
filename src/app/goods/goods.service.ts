import { inject, Injectable, signal } from '@angular/core';
import { Good, NewGood } from '../interfaces/good.model';
import { GoodsFirebaseService } from './goodsFirebase.service';

@Injectable({ providedIn: 'root' })
export class GoodsService {
  goodsFirebaseService = inject(GoodsFirebaseService);
  goods = signal<Good[]>([]);

  addGood(newGood: Good): void {
    this.goodsFirebaseService.addGood(newGood).subscribe((addedGoodId) => {
      this.goods.update((currentGoods) => [
        { ...newGood, id: addedGoodId },
        ...currentGoods,
      ]);
    });
  }

  removeGood(goodId: string): void {
    this.goods.update((currentGoods) =>
      currentGoods.filter((good) => good.id !== goodId)
    );
  }

  updateGood(goodId: string, updatedGood: NewGood): void {
    this.goods.update((currentGoods) =>
      currentGoods.map((good) =>
        good.id === goodId ? { ...good, ...updatedGood } : good
      )
    );
  }
}
