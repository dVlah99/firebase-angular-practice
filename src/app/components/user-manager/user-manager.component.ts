import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/userService/user.service';
import { User } from '../../shared/types/user.type';
import { Router } from '@angular/router';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';

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
  changesDetected: boolean = true;

  ngOnInit() {
    const $users = this.getUsers();
    $users.subscribe((users) => {
      this.users = [...users];
    });
  }

  getUsers(): Observable<User[]> {
    return this.userService.getAllUsers();
  }

  saveChanges() {}

  addAdmin() {}

  deleteUser(uid: string) {
    console.log(uid);
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  openAdminManager() {
    this.dialog.open(AdminManagerComponent);
  }
}
