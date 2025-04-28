import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-good-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  standalone: true,
  templateUrl: './add-good-dialog.component.html',
  styleUrl: './add-good-dialog.component.css',
})
export class AddGoodDialogComponent {
  dialogRef = inject(MatDialogRef<AddGoodDialogComponent>);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    category: new FormControl<
      'clothes' | 'footwear' | 'toys' | 'games' | 'other'
    >('other', { validators: [Validators.required] }),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }
    console.log(this.form);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.form.reset();
  }
}
