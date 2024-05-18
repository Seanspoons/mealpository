import { Pipe, PipeTransform } from '@angular/core';
import Fraction from 'fraction.js';

@Pipe({
  name: 'decimalToFraction',
  standalone: false
})
export class DecimalToFractionPipe implements PipeTransform {

  transform(value: number): string {
    if (value === undefined || value === null) {
      return '';
    }

    const fraction = new Fraction(value);

    // Special case for values that are effectively integers
    if (fraction.d === 1) {
      return fraction.n.toString();
    }

    const wholePart = Math.floor(fraction.n / fraction.d);
    const remainderNumerator = fraction.n % fraction.d;

    if (wholePart === 0) {
      return `${remainderNumerator}/${fraction.d}`;
    }

    if (remainderNumerator === 0) {
      return `${wholePart}`;
    }

    return `${wholePart} ${remainderNumerator}/${fraction.d}`;
  }

}

