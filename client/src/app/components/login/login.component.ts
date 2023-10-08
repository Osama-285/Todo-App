// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getErrorMessage(controlName: string): string {
    if (this.isSubmitted) {
      const control = this.loginForm.get(controlName);
      if (control?.hasError('required')) {
        return 'This field is required';
      } else if (control?.hasError('minlength')) {
        return `Must be at least ${
          control.getError('minlength').requiredLength
        } characters long`;
      }
      return '';
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(email, password);
      this.userService.loginUser(email, password).subscribe(
        (response) => {
          console.log('User login successfully:', response);
          this.auth.setToken(response['token']);

          this.router.navigate(['/todos']);
        },
        (error) => {
          console.error('Error login user:', error);
          this.router.navigate(['/login']);
        }
      );
    }
  }
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
