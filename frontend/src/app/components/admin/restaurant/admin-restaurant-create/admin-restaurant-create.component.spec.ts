import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantCreateComponent } from './admin-restaurant-create.component';

describe('AdminRestaurantCreateComponent', () => {
  let component: AdminRestaurantCreateComponent;
  let fixture: ComponentFixture<AdminRestaurantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
