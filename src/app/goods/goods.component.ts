import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GoodsService } from './goods.service';
import { GoodsFirebaseService } from './goodsFirebase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGoodDialogComponent } from './add-good/add-good-dialog/add-good-dialog.component';

@Component({
  selector: 'app-goods',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './goods.component.html',
  styleUrl: './goods.component.css',
})
export class GoodsComponent implements OnInit {
  goodsService = inject(GoodsService);
  goodsFirebaseService = inject(GoodsFirebaseService);
  goods = this.goodsService.goods;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.goodsFirebaseService.getAllGoods().subscribe((goods) => {
      this.goodsService.goods.set(goods);
    });
  }

  openAddGoodDialog(): void {
    const dialogRef = this.dialog.open(AddGoodDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Result: ', result);
    });
  }
}
