import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Good, NewGood } from './interfaces/good.model';
import { deleteDoc, setDoc } from 'firebase/firestore';

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
    return from(addDoc(this.goodsCollection, good).then((ref) => ref.id));
  }

  removeGood(goodId: string): Observable<void> {
    const docRef = doc(this.firestore, 'goods', goodId);
    return from(deleteDoc(docRef));
  }

  updateGood(goodId: string, updatedGood: Partial<NewGood>): Observable<void> {
    const docRef = doc(this.firestore, 'goods/' + goodId);
    return from(setDoc(docRef, updatedGood));
  }
}
