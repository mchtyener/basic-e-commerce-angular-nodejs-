import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsPlaceholderComponent } from './restaurants-placeholder.component';

describe('RestaurantsPlaceholderComponent', () => {
  let component: RestaurantsPlaceholderComponent;
  let fixture: ComponentFixture<RestaurantsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
