import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup
  loading: boolean

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private us: UserService
  ) {}

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

    if (!form.valid) {
      return
    }
    this.loading = true
    this.us.login(form.value)
      .subscribe(done => {
        this.loading = false

        if (done) {
          this.router.navigate(['/'])
        }
      })
  }
}
