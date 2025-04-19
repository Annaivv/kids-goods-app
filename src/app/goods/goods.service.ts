import { Injectable, signal } from '@angular/core';
import { Good } from '../interfaces/good.model';

@Injectable({ providedIn: 'root' })
export class GoodsService {
  goods = signal<Good[]>([]);

  addGood(newGood: Good) {
    this.goods.update((currentGoods) => [...currentGoods, newGood]);
  }

  removeGood(goodId: string) {
    this.goods.update((currentGoods) =>
      currentGoods.filter((good) => good.id !== goodId)
    );
  }

  updateGood(goodId: string, updatedGood: Good) {
    this.goods.update((currentGoods) =>
      currentGoods.map((good) =>
        good.id === goodId ? { ...good, ...updatedGood } : good
      )
    );
  }
}
