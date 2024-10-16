import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneNumber } from 'libphonenumber-js/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { PhoneNumberInputComponent } from "../phone-number-input/phone-number-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule, PhoneNumberInputComponent, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isSubmitting = false;
  phoneNumberValid: boolean = false;
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator() });


  constructor(private authService: AuthService, private modalService: NgbModal) { }

  get f() { return this.form.controls; }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  updatePhoneNumber(phoneNumberData: PhoneNumber | undefined): void {
    this.form.get('phone')?.setValue(phoneNumberData?.number);
    console.log(phoneNumberData?.isValid())
    console.log(this.form.valid, 'form')
    this.phoneNumberValid = phoneNumberData?.isValid() ?? false;
  }



  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.form.value).subscribe((data: User) => {
      if (data.success) {
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      console.log(err)
    })

    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }

  get isDisabled(): boolean {
    return this.form.invalid || !this.phoneNumberValid
  }

}
