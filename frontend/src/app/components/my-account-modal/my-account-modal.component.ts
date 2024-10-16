import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './my-account-modal.component.html',
  styleUrl: './my-account-modal.component.scss'
})
export class MyAccountModalComponent {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) {
  }


  logout() {
    this.authService.logout().pipe(tap((res) => {
      if (res.success) {
        this.userService.removeAuthToken();
        this.userService.isLoggedInSignal.set(false);
        this.router.navigate([''])
        this.modalService.dismissAll();
      }
    })).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
      },
    });
  }
}
