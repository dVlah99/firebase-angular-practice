import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/userService/user.service';
import { User } from '../../shared/types/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
})
export class UserManagerComponent {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  users!: User[];

  ngOnInit() {
    const $users = this.getUsers();
    $users.subscribe((users) => {
      this.users = [...users];
    });
  }

  getUsers(): Observable<User[]> {
    return this.userService.getAllUsers();
  }

  deleteUser(uid: string) {
    console.log(uid);
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
