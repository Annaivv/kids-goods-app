import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GoodsFirebaseService } from '../../goodsFirebase.service';

import { Category, NewGood } from '../../interfaces/good.model';
import { take } from 'rxjs';
import { Good } from '../../interfaces/good.model';
import { ToastService } from '../../../toasts/toast.service';

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
  toastServise = inject(ToastService);

  data = signal<Good | null>(inject(MAT_DIALOG_DATA));

  form = new FormGroup({
    name: new FormControl(this.data()?.name || '', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    description: new FormControl(this.data()?.description || '', {
      validators: [Validators.required],
    }),
    category: new FormControl<Category>(
      (this.data()?.category as Category) || 'other',
      { validators: [Validators.required] }
    ),
    price: new FormControl(this.data()?.price || 0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    image: new FormControl<string | null>(this.data()?.image || null),
  });

  onAddGood(addedData: NewGood): void {
    this.goodsFirebaseService
      .addGood(addedData)
      .pipe(take(1))
      .subscribe({
        next: (addedGoodId) => {
          console.log('Good added with ID:', addedGoodId);
          this.dialogRef.close({ ...addedData, id: addedGoodId });
        },
        error: (error) => {
          console.error('Error adding good:', error);
        },
      });
  }

  onUpdateGood(updatedData: NewGood, goodId: string): void {
    this.goodsFirebaseService
      .updateGood(goodId, updatedData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Good updated with ID:', goodId);
          this.dialogRef.close(updatedData);
        },
        error: (error) => {
          console.error('Error updating good:', error);
        },
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }

    console.log('Form submitted:', this.form.value);
    const formData = this.form.value as NewGood;
    const existingGoodId = this.data()?.id;

    existingGoodId
      ? this.onUpdateGood(formData, existingGoodId)
      : this.onAddGood(formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.form.reset();
  }
}
