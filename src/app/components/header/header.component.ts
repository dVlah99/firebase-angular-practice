import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../shared/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuItems = [
    {
      label: 'Manage Users',
      icon: 'pi pi-users',
      command: () => this.manageUsers(),
    },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  selectedItem: any;

  constructor(
    private authSevice: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  manageUsers() {
    this.router.navigate(['user-manager']);
  }

  logout() {
    this.authSevice.logout();
  }

  handleMenuClick(item: any) {
    if (item.command) {
      item.command();
    }
  }
}
