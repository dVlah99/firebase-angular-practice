import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  User,
  LoginUserInput,
  userRoles,
  RegisteUserInput,
} from '../../types/user.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Observable,
  switchMap,
  of,
  BehaviorSubject,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { UserService } from '../userService/user.service';
import { Product } from '../../types/product.type';
import { user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<User | undefined>;
  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.user$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(undefined);
        }
      })
    );
  }

  async login({ email, password }: LoginUserInput) {
    try {
      await this.fireauth.signInWithEmailAndPassword(email, password);
      const token = await this.fireauth.currentUser.then(async (user) => {
        const unverifiedToken = await user?.getIdToken();
        if (unverifiedToken) {
          return unverifiedToken;
        }
        throw Error('Could not log in user');
      });

      this.router.navigate(['/dashboard']);
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.toastr.error(error.message, 'Error');
      }
      this.router.navigate(['/login']);
    }
  }

  async logout() {
    try {
      await this.fireauth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('logout error: ', error);
      alert('logout error');
    }
  }

  async register({ email, password, displayName }: RegisteUserInput) {
    try {
      const user = await this.fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = <string>user.user?.uid;
      await this.userService.addUser({
        email,
        uid,
        role: userRoles.DEFAULT,
        displayName,
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Register error: ', error);
    }
  }

  async getAuthToken(): Promise<string | null> {
    const user = await this.fireauth.currentUser;
    if (user) {
      return user.getIdToken();
    } else {
      return null;
    }
  }

  async checkUserPermissions(product: Product): Promise<boolean> {
    try {
      const user = await this.fireauth.currentUser;
      if (user) {
        const isAdmin = await this.isAdmin(user.uid);

        if (isAdmin) {
          return true;
        }

        if (user.uid === product.uid) {
          return true;
        }

        return false;
      } else {
        console.error('No user logged in');
        throw new Error('No user logged in');
      }
    } catch (error) {
      throw new Error('Error');
    }
  }

  async isAdmin(userId: string): Promise<boolean> {
    const role$ = this.getUserById(userId);
    const isAdmin: boolean = await new Promise((resolve, reject) => {
      role$.subscribe(
        (data) => {
          if (data.role === userRoles.ADMIN) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });

    return isAdmin;
  }

  async getCurrentUserId(): Promise<string> {
    const uid = (await this.fireauth.currentUser)?.uid;
    if (uid) {
      return uid;
    }
    throw Error('User error');
  }

  getUserById(userId: string): Observable<User> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (!action.payload.exists) {
            throw new Error('User not found');
          }

          const data = action.payload.data() as User;
          const id = action.payload.id;
          return { id, ...data };
        }),
        catchError((error) => {
          console.error('Error fetching user:', error);
          return throwError(() => new Error('Failed to fetch user'));
        })
      );
  }
}
