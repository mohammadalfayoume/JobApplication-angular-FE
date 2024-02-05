import { Component } from '@angular/core';
import { AuthService } from '../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidPasswordMatching } from '../passwordMatchingValidator';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  constructor(private auth: AuthService, private router: Router) { }
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), invalidPasswordMatching]),
    roleId: new FormControl('1', Validators.required)
  });
    
    
  submitForm() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.auth.registerUser(userData).subscribe(
        response => {
          // Handle successful registration
          console.log('Registration successful:', response);
          this.router.navigate(['/profile']);
        },
        error => {
          // Handle registration error
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
