import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}
  email!: string;
  password!: string;
  displayName!: string;
  onSubmit() {
    this.authService.register({
      email: this.email,
      password: this.password,
      displayName: this.displayName,
    });
  }
}
