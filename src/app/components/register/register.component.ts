import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  email!: string;
  password!: string;
  displayName!: string;

  returnToLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    try {
      this.authService.register({
        email: this.email,
        password: this.password,
        displayName: this.displayName,
      });
      this.router.navigate(['/login']);
      this.toastr.success('Succesfully registered!', 'Success');
    } catch (error) {
      this.toastr.error('Error while registering user!', 'Error');
    }
  }
}
