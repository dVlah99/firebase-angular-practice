import { Component } from '@angular/core';
import { AdminService } from '../../../shared/services/userService/admin.service';
import { FirebaseError } from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-manager',

  templateUrl: './admin-manager.component.html',
  styleUrl: './admin-manager.component.css',
})
export class AdminManagerComponent {
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AdminManagerComponent>
  ) {}
  email!: string;

  async addAdmin() {
    try {
      const user = await this.adminService.addAdmin(this.email);
      this.toastr.success('Admin added!');
    } catch (error) {
      if (error instanceof FirebaseError) {
        this.toastr.error(error.message, 'Error');
        throw error;
      }
      throw error;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
