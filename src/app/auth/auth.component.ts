import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-auth',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LoadingSpinnerComponent,
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  isLoginMode: boolean = false;

  readonly authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitError = signal<string | null>(null);

  inputError = signal<string>('');

  isLoading = signal<boolean>(false);

  hide = signal<boolean>(true);

  private authService = inject(AuthService);

  constructor() {
    merge(this.authForm.statusChanges, this.authForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage(): void {
    if (!this.authForm.dirty && !this.authForm.touched) {
      this.inputError.set('');
      return;
    }

    if (this.authForm.valid) {
      this.inputError.set('');
      return;
    }

    const errorMessage = this.getFirstValidationError();
    this.inputError.set(errorMessage);
  }

  private getFirstValidationError(): string {
    const ERROR_MESSAGES = {
      EMAIL_INVALID: 'Not a valid email',
      EMAIL_REQUIRED: 'You must enter an email value',
      PASSWORD_REQUIRED: 'You must enter a password value',
      PASSWORD_MIN_LENGTH: 'Your password should be at least 6 characters long',
    };

    const emailControl = this.authForm.get('email');
    const passwordControl = this.authForm.get('password');

    if (emailControl?.hasError('email')) return ERROR_MESSAGES.EMAIL_INVALID;
    if (emailControl?.hasError('required'))
      return ERROR_MESSAGES.EMAIL_REQUIRED;
    if (passwordControl?.hasError('required'))
      return ERROR_MESSAGES.PASSWORD_REQUIRED;
    if ((passwordControl?.value ?? '').length < 6)
      return ERROR_MESSAGES.PASSWORD_MIN_LENGTH;

    return '';
  }

  clickHideEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formDir: FormGroupDirective): void {
    if (this.authForm.invalid) {
      formDir.control.markAllAsTouched();
      this.updateErrorMessage();
      return;
    }

    const email = this.authForm.value.email ?? '';
    const password = this.authForm.value.password ?? '';

    this.isLoading.set(true);

    if (this.isLoginMode) {
      //...
    } else {
      this.authService.signup(email, password).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading.set(false);
          formDir.resetForm();
          this.authForm.reset();
        },
        error: (errorMessage) => {
          console.error(errorMessage);
          this.submitError.set(errorMessage);
          this.isLoading.set(false);
        },
      });
    }
  }
}
