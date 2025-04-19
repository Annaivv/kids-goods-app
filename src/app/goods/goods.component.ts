import { Component, inject, OnInit } from '@angular/core';
import { GoodsFirebaseService } from './goodsFirebase.service';
import { GoodsService } from './goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css'],
  standalone: true,
  imports: [],
})
export class GoodsComponent implements OnInit {
  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);

  ngOnInit(): void {}
}
