import { Injectable } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaskerModalService {

  cartOffcanvasVisible = new BehaviorSubject<boolean | undefined>(undefined);
  cartOffcanvasVisible$ = this.cartOffcanvasVisible.asObservable();

  constructor(private offcanvasService: NgbOffcanvas,) { }

  openModal() {
    this.offcanvasService.dismiss();
    import('../components/basket-modal/basket-modal.component').then(({ BasketModalComponent }) => {
      const cartOffcanvasRef = this.offcanvasService.open(
        BasketModalComponent,
        {
          panelClass: 'cart-offcanvas',
          position: 'end'
        }
      );
      this.cartOffcanvasVisible.next(true);
      cartOffcanvasRef.dismissed.subscribe(() => {
        this.cartOffcanvasVisible.next(false);
      });
    });
  }

  openMyAccountModal() {
    this.offcanvasService.dismiss();
    import('../components/my-account-modal/my-account-modal.component').then(({ MyAccountModalComponent }) => {
      const cartOffcanvasRef = this.offcanvasService.open(
        MyAccountModalComponent,
        {
          panelClass: 'cart-offcanvas',
          position: 'start'
        }
      );
      this.cartOffcanvasVisible.next(true);
      cartOffcanvasRef.dismissed.subscribe(() => {
        this.cartOffcanvasVisible.next(false);
      });
    });
  }
}
