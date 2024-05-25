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
import { Observable, switchMap, of, BehaviorSubject } from 'rxjs';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<User | undefined>;
  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
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
      alert('LOGIN GRESKA');
      console.log('Login error: ', error);
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
}
