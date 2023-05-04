import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateDay } from '../validators/validators';

@Component({
  selector: 'age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.css']
})
export class AgeCalculatorComponent {

  public date = new Date()
  public years: string | number  = '--'
  public months: string | number = '--'
  public days: string | number = '--'

  profileForm: FormGroup = this.formBuilder.group({
    day: ['',
      [ Validators.required, Validators.min(1), Validators.max(31)]
    ],
    month: ['',
      [ Validators.required, Validators.min(1), Validators.max(12) ]
    ],
    year: ['',
      [ Validators.required, Validators.max(this.date.getFullYear())]
    ],
  }, { validators: validateDay });

  constructor(private formBuilder: FormBuilder) { }

  calculateUserAge():void {
    this.years = this.date.getFullYear() -  this.profileForm.value.year
    this.months = this.date.getMonth() + 1 - this.profileForm.value.month
    this.days = this.date.getDate() - this.profileForm.value.day

    if (this.days < 0) {
      this.months--;
      let lastMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
      this.days += lastMonth.getDate();
    }

    if (this.months < 0) {
      this.years--;
      this.months += 12;
    }
  }

  getClass():any {
    if (this.profileForm.invalid && this.profileForm.dirty)
      return 'form-invalid'

    if (this.profileForm.valid && this.profileForm.dirty)
      return 'form-valid'
  }

  getErrors(profileFormName:string, validatorName:string) {
    return this.profileForm.controls[profileFormName].errors?.[validatorName]  
  }

  onSubmit():any {
    console.log(this.profileForm)
    if (this.profileForm.invalid) {
      this.profileForm.markAsDirty()
      return 
    }
    this.profileForm.markAsPristine()
    this.calculateUserAge()
  }

}
