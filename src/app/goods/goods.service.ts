import { Injectable, signal } from '@angular/core';
import { Good } from './good/good.model';

@Injectable({ providedIn: 'root' })
export class GoodsService {
  goods = signal<Good[]>([]);

  addGood(good: Good) {
    this.goods.update((currentGoods) => [...currentGoods, good]);
  }

  changeGood(id: string, updatedGood: Partial<Good>) {
    this.goods.update((goods) =>
      goods.map((good) => (good.id === id ? { ...good, ...updatedGood } : good))
    );
  }

  deleteGood(id: string) {
    this.goods.update((goods) => goods.filter((good) => good.id !== id));
  }
}
