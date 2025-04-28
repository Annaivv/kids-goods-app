import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Good } from './interfaces/good.model';

@Injectable({ providedIn: 'root' })
export class GoodsFirebaseService {
  firestore = inject(Firestore);
  goodsCollection = collection(this.firestore, 'goods');

  getAllGoods(): Observable<Good[]> {
    return collectionData(this.goodsCollection, {
      idField: 'id',
    }) as Observable<Good[]>;
  }

  addGood(good: Good): Observable<string> {
    const goodToCreate = {
      name: good.name,
      description: good.description,
      price: good.price,
      image: good.image,
      category: good.category,
    };
    const promise = addDoc(this.goodsCollection, goodToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }
}
