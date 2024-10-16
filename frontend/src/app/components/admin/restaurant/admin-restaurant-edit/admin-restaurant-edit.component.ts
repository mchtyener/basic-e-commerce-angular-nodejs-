import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneNumber } from 'libphonenumber-js/core';
import { FileItem } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import { errorSweetAlert, successSweetAlert } from '../../../../data/swert-alert';
import { Restaurant } from '../../../../models/restaurant';
import { RestaurantService } from '../../../../services/restaurant.service';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'app-admin-restaurant-edit',
  standalone: true,
  imports: [],
  templateUrl: './admin-restaurant-edit.component.html',
  styleUrl: './admin-restaurant-edit.component.scss'
})
export class AdminRestaurantEditComponent implements OnInit {
  @Input() id: string = ''
  assets: string = environment.url + 'uploads/'
  phoneNumberValid: boolean = false;
  restaurantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    banner: new FormControl('', Validators.required),
    opening_time: new FormControl('', Validators.required),
    closing_time: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    minimum_order_amount: new FormControl('', [Validators.required, Validators.min(0)]),
  }, { validators: this.closingTimeValidator() });

  logoData: FileItem | undefined = undefined
  bannerData: FileItem | undefined = undefined

  files!: File[];

  constructor(private uploadService: UploadService, private restaurantService: RestaurantService, private routeService: Router) { }

  ngOnInit(): void {
    console.log(this.id)
  }

  get gf() {
    return this.restaurantForm.controls;
  }

  onSubmit(): void {

    if (!this.restaurantForm.valid) {
      errorSweetAlert('Eksik bilgiler girdiniz tüm formu doldurunuz.');
      return
    }

    const restaurant = this.restaurantForm.value as Restaurant;

    this.restaurantService.createRestaurant(restaurant).subscribe({
      next: (data) => {
        if (data.success) {
          successSweetAlert('Başarıyla kaydedildi');
          this.routeService.navigate(['admin/restaurant'])
        }
      },
      error: () => {

      }
    })

  }


  updatePhoneNumber(phoneNumberData: PhoneNumber | undefined): void {
    this.restaurantForm.get('phone')?.setValue(phoneNumberData?.number ?? '');
    console.log(phoneNumberData?.isValid())
    console.log(this.restaurantForm.valid, 'form')
    this.phoneNumberValid = phoneNumberData?.isValid() ?? false;
  }


  dropped($event: any, type: string) {
    this.files = Array.from($event);
    this.getBase64(this.files[0]).then(base64 => {
      const img = new Image();
      if (typeof base64 === 'string') {
        img.src = base64;
      }
      this.uploadFile(type);
    }).catch(error => {
      console.error('Base64 dönüşüm hatası:', error);
    });
  }


  async getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  uploadFile(type: string) {
    if (this.files.length > 0) {
      this.uploadService.uploadsFile(this.files).subscribe({
        next: (data) => {
          if (data.success) {
            this.setFile(type, data)
          }
        }
      })
    }
  }

  setFile(type: string, data: any) {
    if (type === 'logo') {
      this.restaurantForm.get('logo')?.setValue(data.filePath);
    } else if (type === 'banner') {
      this.restaurantForm.get('banner')?.setValue(data.filePath);
    }
  }


  closingTimeValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const openingTime = formGroup.get('opening_time')?.value;
      const closingTime = formGroup.get('closing_time')?.value;

      if (!openingTime || !closingTime) {
        return null;
      }

      if (closingTime <= openingTime) {
        return { closingTimeError: 'Kapanış saati açılış saatinden sonra olmalıdır.' };
      }

      return null;
    };

  }

  get isDisabled(): boolean {
    return this.restaurantForm.invalid || !this.phoneNumberValid
  }

}
