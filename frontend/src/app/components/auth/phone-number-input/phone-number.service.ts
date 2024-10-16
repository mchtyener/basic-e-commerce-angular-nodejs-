import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor() { }

  getPhoneMask(countryCallingCode: string | undefined): string | undefined {
    if (!countryCallingCode) {
      return undefined;
    }
    switch (countryCallingCode) {
      case '90':
        return '000-000-0000';
      case '7':
        return '000-000-0000';
      case '965':
        return '0000-0000';
      case '966':
        return '00-000-0000';
      case '973':
        return '00-000000';
      case '968':
        return '00-000000';
      case '974':
        return '0000-0000';
      case '971':
        return '00-000-00000';
      default:
        return undefined;
    }
  }
}
