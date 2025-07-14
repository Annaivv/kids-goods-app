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

@Component({
  selector: 'app-auth',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
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

  errorMessage = signal<string>('');

  hide = signal<boolean>(true);

  private authService = inject(AuthService);

  constructor() {
    merge(this.authForm.statusChanges, this.authForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage(): void {
    if (!this.authForm.dirty && !this.authForm.touched) {
      this.errorMessage.set('');
      return;
    }

    if (!this.authForm.valid) {
      this.errorMessage.set('');

      const emailControl = this.authForm.get('email');
      const passwordControl = this.authForm.get('password');

      if (emailControl?.hasError('email')) {
        this.errorMessage.set('Not a valid email');
      } else if (emailControl?.hasError('required')) {
        this.errorMessage.set('You must enter an email value');
      } else if (passwordControl?.hasError('required')) {
        this.errorMessage.set('You must enter a password value');
      } else if ((passwordControl?.value ?? '').length < 6) {
        this.errorMessage.set(
          'Your password should be at least 6 characters long'
        );
      } else {
        this.errorMessage.set('');
      }
    }
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

    if (this.isLoginMode) {
      //...
    } else {
      this.authService.signup(email, password).subscribe((resData) => {
        console.log(resData);
      });
    }

    formDir.resetForm();
    this.authForm.reset();
  }
}
