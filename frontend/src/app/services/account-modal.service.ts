import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AccountModalService {

  constructor(private modalService: NgbModal) { }

  openLoginModal(): void {
    this.modalService.open(LoginComponent);
  }

  openRegisterModal(): void {
    this.modalService.open(RegisterComponent);
  }
}
