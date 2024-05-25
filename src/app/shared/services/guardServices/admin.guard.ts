import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      take(1),
      tap((authState) => {
        if (!authState) {
          this.router.navigate(['/login']);
        }
      }),
      switchMap((authState) => {
        if (authState) {
          return this.userService.getUserRole(authState.uid).pipe(
            map((userRole) => userRole?.role === 'ADMIN'),
            tap((isAdmin) => {
              if (!isAdmin) {
                this.router.navigate(['/dashboard']);
              }
            })
          );
        } else {
          return new Observable<boolean>((observer) => observer.next(false));
        }
      })
    );
  }
}
