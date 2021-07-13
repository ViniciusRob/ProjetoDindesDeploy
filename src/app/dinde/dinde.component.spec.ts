import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DindeComponent } from './dinde.component';

describe('DindeComponent', () => {
  let component: DindeComponent;
  let fixture: ComponentFixture<DindeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DindeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DindeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
