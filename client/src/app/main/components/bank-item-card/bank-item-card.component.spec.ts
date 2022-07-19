import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankItemCardComponent } from './bank-item-card.component';

describe('BankItemCardComponent', () => {
  let component: BankItemCardComponent;
  let fixture: ComponentFixture<BankItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
