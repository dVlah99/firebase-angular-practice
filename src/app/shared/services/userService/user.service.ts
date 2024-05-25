import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection = this.firestore.collection<Partial<User>>('users');

  constructor(private firestore: AngularFirestore) {}

  async addUser({ email, role, uid, displayName }: User): Promise<boolean> {
    await this.usersCollection.doc(uid).set({ email, role, displayName });
    return true;
  }

  getUserRole(userId: string): Observable<Partial<User> | undefined> {
    return this.usersCollection.doc(userId).valueChanges();
  }

  /*   editUser(user: User): Promise<void> {
    return this.usersCollection.doc(user.uid).update(user);
  } */

  getUser(userId: string): Observable<User | undefined> {
    return this.firestore.doc<User>(`users/${userId}`).valueChanges();
  }
}
