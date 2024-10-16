import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { errorSweetAlert, successSweetAlert } from '../../../../data/swert-alert';
import { Restaurant } from '../../../../models/restaurant';
import { RestaurantService } from '../../../../services/restaurant.service';
import { UploadService } from '../../../../services/upload.service';
import { PhoneNumberInputComponent } from "../../../auth/phone-number-input/phone-number-input.component";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, PhoneNumberInputComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  assets: string = environment.url + 'uploads/'
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });


  files!: File[];

  constructor(private uploadService: UploadService, private restaurantService: RestaurantService, private routeService: Router) { }

  get gf() {
    return this.productForm.controls;
  }

  onSubmit(): void {

    if (!this.productForm.valid) {
      errorSweetAlert('Eksik bilgiler girdiniz tüm formu doldurunuz.');
      return
    }

    const restaurant = this.productForm.value as Restaurant;

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


  dropped($event: any) {
    this.files = Array.from($event);
    this.getBase64(this.files[0]).then(base64 => {
      const img = new Image();
      if (typeof base64 === 'string') {
        img.src = base64;
      }
      this.uploadFile();
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


  uploadFile() {
    if (this.files.length > 0) {
      this.uploadService.uploadsFile(this.files).subscribe({
        next: (data) => {
          if (data.success) {
            this.setFile(data)
          }
        }
      })
    }
  }

  setFile(data: any) {
    this.productForm.get('logo')?.setValue(data.filePath);
  }


}
