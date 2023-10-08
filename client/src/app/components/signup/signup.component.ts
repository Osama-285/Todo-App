import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getErrorMessage(controlName: string): string {
    if (this.isSubmitted) {
      const control = this.signupForm.get(controlName);
      if (control?.hasError('required')) {
        return 'This field is required';
      } else if (control?.hasError('minlength')) {
        return `Must be at least ${
          control.getError('minlength').requiredLength
        } characters long`;
      } else if (control?.hasError('email')) {
        return 'Invalid email format';
      }
      return '';
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.userService.registerUser(username, email, password).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  onLogin() {
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }
}
