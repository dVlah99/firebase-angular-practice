import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AddProductInput,
  EditProductInput,
  Product,
} from '../../types/product.type';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth
  ) {}

  getProducts(): Observable<Product[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((product) => {
            const data = Object.assign(
              {},
              product.payload.doc.data() as Product,
              { id: product.payload.doc.id }
            );

            return { ...data };
          });
        }),
        catchError((error) => {
          console.error('Error fetching products:', error);
          return throwError(() => new Error('Failed to fetch products'));
        })
      );
  }

  async addProduct(product: AddProductInput): Promise<void> {
    try {
      const user = await this.fireauth.currentUser;
      if (user) {
        const uid = user.uid;
        const id = this.firestore.createId();
        await this.firestore
          .collection('products')
          .doc(id)
          .set({ uid, ...product });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.firestore.collection('products').doc(productId).delete();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  async editProduct(updatedProduct: EditProductInput): Promise<void> {
    try {
      const user = await this.fireauth.currentUser;
      if (user) {
        const uid = user.uid;
        const { id, ...productData } = updatedProduct;
        await this.firestore
          .collection('products')
          .doc(id)
          .update({ uid, ...productData });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }
}
