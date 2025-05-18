import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Good } from './interfaces/good.model';

export type NewGood = Omit<Good, 'id'>;

@Injectable({ providedIn: 'root' })
export class GoodsFirebaseService {
  private firestore: Firestore = inject(Firestore);
  private goodsCollection = collection(this.firestore, 'goods');

  getAllGoods(): Observable<Good[]> {
    return collectionData(this.goodsCollection, {
      idField: 'id',
    }) as Observable<Good[]>;
  }

  addGood(good: NewGood): Observable<string> {
    // const goodToCreate = {
    //   name: good.name,
    //   description: good.description,
    //   price: good.price,
    //   image: good.image,
    //   category: good.category,
    // };
    // const promise = addDoc(this.goodsCollection, goodToCreate).then(
    //   (response) => response.id
    // );
    // return from(promise);
    return from(addDoc(this.goodsCollection, good).then((ref) => ref.id));
  }
}
