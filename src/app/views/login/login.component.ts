import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { UserService } from 'src/app/services/user.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  signupForm: FormGroup
  loading: boolean
  mode = 0
  depts: Department[]
  success: boolean

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true }
    }
  }

  emailAsyncValidator = (control: FormControl): Observable<{[s: string]: boolean} | null> => {
    return this.us.isExistByEmail(control.value)
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })

    this.signupForm = this.fb.group({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        asyncValidators: this.emailAsyncValidator,
        updateOn: 'blur'
      }),
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      deptID: [null, [Validators.required]]
    })
  }

  login(): void {
    const form = this.loginForm
    for (const i in form.controls) {
      if (!form.controls.hasOwnProperty(i)) {
        continue
      }
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

  signup(): void {
    this.success = false
    const form = this.signupForm
    for (const i in form.controls) {
      if (!form.controls.hasOwnProperty(i)) {
        continue
      }
      const c = form.controls[i]
      if (!c.valid) {
        c.markAsDirty()
        c.updateValueAndValidity()
      }
    }

    if (!form.valid) {
      return
    }

    this.loading = true
    this.us.signup(form.value)
      .subscribe(done => {
        this.loading = false

        if (done) {
          this.success = true
          this.reset()
        }
      })
  }

  onLoadDepts(isOpen: boolean) {
    if (!isOpen || this.depts) {
      return
    }

    this.us.fetchDepartments()
      .subscribe((depts: Department[]) => {
        this.depts = depts
      })
  }

  onToggleSign() {
    this.success = false
    this.mode ^= 1

    if (this.mode === 0) {
      this.reset()
    }
  }

  reset() {
    this.signupForm.reset()
  }
}
