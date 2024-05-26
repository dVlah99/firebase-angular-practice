import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/authService/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async onSubmit() {
    if (this.email.trim() !== '') {
      try {
        await this.authService.resetPassword(this.email);
        this.toastr.info('Password reset email sent', 'Success');
      } catch (error) {
        if (error instanceof FirebaseError) {
          this.toastr.error(error.message, 'Error');
        }
      }
    }
  }

  returnToLogin() {
    this.router.navigate(['/login']);
  }
}
