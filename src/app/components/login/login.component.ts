import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/authService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  email: string = '';
  password: string = '';

  loginUser() {
    try {
      this.authService.login({ email: this.email, password: this.password });
    } catch (error) {
      this.toastr.error('Error while loging in', 'Error');
    }
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword(email: string) {
    this.router.navigate(['reset-password']);
  }
}
