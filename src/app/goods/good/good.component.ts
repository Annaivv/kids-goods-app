import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Good } from '../interfaces/good.model';

@Component({
  selector: 'app-good',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './good.component.html',
  styleUrl: './good.component.css',
})
export class GoodComponent {
  good = input.required<Good>();
}
