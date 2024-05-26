import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/authService/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  canAccessUserManager!: boolean;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const userId = await this.authService.getCurrentUserId();
    this.canAccessUserManager = await this.authService.isAdmin(userId);

    this.menuItems = [
      {
        label: 'Manage Users',
        icon: 'pi pi-users',
        command: () => this.manageUsers(),
        visible: this.canAccessUserManager,
      },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }

  manageUsers() {
    if (this.canAccessUserManager) {
      this.router.navigate(['user-manager']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleMenuClick(item: any) {
    if (item.command) {
      item.command();
    }
  }
}
