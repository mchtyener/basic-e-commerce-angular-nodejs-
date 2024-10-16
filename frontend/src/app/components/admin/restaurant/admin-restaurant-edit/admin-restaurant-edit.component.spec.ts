import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantEditComponent } from './admin-restaurant-edit.component';

describe('AdminRestaurantEditComponent', () => {
  let component: AdminRestaurantEditComponent;
  let fixture: ComponentFixture<AdminRestaurantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
