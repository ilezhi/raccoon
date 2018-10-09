import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    const form = this.validateForm
    for (const i in form.controls) {
      form.controls[i].markAsDirty()
      form.controls[i].updateValueAndValidity()
    }

    if (form.valid) {
      // TODO: 登录
      console.log(form.value)
    }
  }
}
