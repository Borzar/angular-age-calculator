import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validateDay: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const day = control.get('day')
  const month = control.get('month')

  return (
    day && month && month.value === 2 && day.value > 28 ||
    day && month && month.value === 4 && day.value > 30 ||
    day && month && month.value === 6 && day.value > 30 ||
    day && month && month.value === 9 && day.value > 30 ||
    day && month && month.value === 11 && day.value > 30 

    ? { identityRevealed : true } : null 
  )

};
