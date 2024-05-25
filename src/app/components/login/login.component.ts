import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  email: string = '';
  password: string = '';

  loginUser() {
    this.authService.login({ email: this.email, password: this.password });
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
}
