import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

import * as UserAction from 'src/app/action/user.action'
import { getLoading, getInfo } from 'src/app/reducers/user.reducer'
import { WSService } from 'src/app/services/socket.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup
  logining$: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.logining$ = store.pipe(
      select(getLoading)
    )
  }

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
      this.store.dispatch(new UserAction.Login(form.value))
    }
  }
}
