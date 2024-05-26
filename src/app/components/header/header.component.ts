import { Component } from '@angular/core';

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
  canAccessUserManager!: boolean;
  selectedItem: any;

  constructor(
    private authSevice: AuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.canAccessUserManager = await this.authService.isAdmin(
      await this.authService.getCurrentUserId()
    );
  }

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
