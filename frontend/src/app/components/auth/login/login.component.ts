import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  constructor(private authService: AuthService, private modalService: NgbModal) { }

  get f() { return this.form.controls; }


  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value).subscribe((data: User) => {
      if (data.success) {
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      console.log(err)
    })
  }

}
