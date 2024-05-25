// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.fireauth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          const url = this.router.url;
          this.router.navigate(['/login'], { queryParams: { returnurl: url } });
          return false;
        }
      })
    );
  }
}
