import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CustomPriceValidator {
  public checkForInvalidPrice(): ValidatorFn {
    return (formGroup: FormGroup) => {
        const unitOfferValuation = formGroup.get('unitOfferValuation');
        const price = formGroup.get('price');
  
        if (!unitOfferValuation || !price) {
          return null;
        }

        if (unitOfferValuation >= price) {
            return { invalidPrice: true };
        }

        return null;
    };
  }
}
