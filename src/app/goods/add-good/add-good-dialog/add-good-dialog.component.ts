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
import { GoodsFirebaseService } from '../../goodsFirebase.service';
import { NewGood } from '../../goodsFirebase.service';
import { take } from 'rxjs';

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
  goodsFirebaseService = inject(GoodsFirebaseService);

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
    price: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    image: new FormControl<string | null>(null),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }

    console.log('Form submitted:', this.form.value);
    this.goodsFirebaseService
      .addGood(this.form.value as NewGood)
      .pipe(take(1))
      .subscribe({
        next: (addedGoodId) => {
          console.log('Good added with ID:', addedGoodId);
          this.dialogRef.close(addedGoodId);
        },
        error: (error) => {
          console.error('Error adding good:', error);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.form.reset();
  }
}
