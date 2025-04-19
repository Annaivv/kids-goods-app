import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Good } from './good/good.model';

@Injectable({ providedIn: 'root' })
export class GoodsFirebaseService {
  firestore = inject(Firestore);
  goodsCollection = collection(this.firestore, 'goods');

  getAllGoods(): Observable<Good[]> {
    return collectionData(this.goodsCollection, {
      idField: 'id',
    }) as Observable<Good[]>;
  }
}
