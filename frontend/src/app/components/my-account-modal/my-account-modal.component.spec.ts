import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountModalComponent } from './my-account-modal.component';

describe('MyAccountModalComponent', () => {
  let component: MyAccountModalComponent;
  let fixture: ComponentFixture<MyAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
