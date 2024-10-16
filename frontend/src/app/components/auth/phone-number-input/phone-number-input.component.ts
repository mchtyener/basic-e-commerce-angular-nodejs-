import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import parsePhoneNumber, { MetadataJson, PhoneNumber } from 'libphonenumber-js/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import metadata from '../../../../assets/json/metadata.custom.json';
import phoneCodesData from '../../../data/phone-number-data';
import { PhoneNumberService } from './phone-number.service';

@Component({
  selector: 'app-phone-number-input',
  standalone: true,
  imports: [NgClass, NgIf, NgSelectModule, NgxMaskDirective, FormsModule, NgFor, TranslateModule],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.scss',
  providers: [
    provideNgxMask(),
  ],
})
export class PhoneNumberInputComponent {
  @Output() phoneNumberChange = new EventEmitter<any>();
  @Input() numberCurrent?: string;
  @Input() isRequired?: boolean = true;
  @Output() phoneData = new EventEmitter<string | undefined>();

  inputPhone?: PhoneNumber;
  phoneCodes = phoneCodesData;
  phoneMask!: string | undefined;
  phoneInputTouched = false;

  phoneNumberForm = {
    phoneCodeId: this.phoneCodes[0].label,
    phoneNumber: this.numberCurrent ?? '',
  };

  onInputFocus() {
    this.phoneInputTouched = true;
  }

  isPhoneInputTouched(): boolean {
    return this.phoneInputTouched;
  }

  isPhoneNumberInvalid(): boolean {
    return this.phoneInputTouched && !this.phoneNumberForm.phoneNumber;
  }

  constructor(private phoneNumberService: PhoneNumberService) {
  }

  ngOnInit(): void {
    if (this.numberCurrent) {
      const parseNumberCurrent = parsePhoneNumber(this.numberCurrent, metadata as MetadataJson);
      this.phoneMasks(parseNumberCurrent);
      this.phoneNumberForm = {
        phoneCodeId: '+' + parseNumberCurrent?.countryCallingCode,
        phoneNumber: parseNumberCurrent?.nationalNumber ?? '',
      };
      this.emitPhoneNumber();
    }
  }

  get fullNumber(): string {
    return this.phoneNumberForm.phoneCodeId + this.phoneNumberForm.phoneNumber;
  }

  changeCodeId(): void {
    this.phoneNumberForm.phoneNumber = '';
    this.emitPhoneNumber();
  }

  emitPhoneNumber(): void {
    this.inputPhone = parsePhoneNumber(this.fullNumber, metadata as MetadataJson);
    this.phoneMasks(this.inputPhone);
    this.phoneNumberChange.emit(this.inputPhone);
    this.phoneData.emit(this.phoneNumberForm.phoneNumber);
  }

  phoneMasks(phoneData: PhoneNumber | undefined) {
    if (phoneData && phoneData.countryCallingCode) {
      this.phoneMask = this.phoneNumberService.getPhoneMask(phoneData.countryCallingCode);
    }
  }
}
