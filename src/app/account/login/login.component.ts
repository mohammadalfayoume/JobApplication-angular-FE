import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  submitForm(){
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.auth.loginUser(userData).subscribe(
        response => {
          // Handle successful registration
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          // Handle login error
          console.error('Login failed:', error);
        }
      );
    }
  }
}
