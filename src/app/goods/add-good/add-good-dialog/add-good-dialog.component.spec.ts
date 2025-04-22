import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodDialogComponent } from './add-good-dialog.component';

describe('AddGoodDialogComponent', () => {
  let component: AddGoodDialogComponent;
  let fixture: ComponentFixture<AddGoodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoodDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
