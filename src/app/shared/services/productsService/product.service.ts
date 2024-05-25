import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Product } from '../../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((product) => {
            const data = product.payload.doc.data() as Product;
            const id = product.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
