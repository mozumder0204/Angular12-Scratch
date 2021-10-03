import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthService } from '../auth.service';
import { AsyncService } from '../../shared/services/async.service';
import { CommonService } from '../../shared/services/common.service';
import { Login } from '../actions/auth.actions';

@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  formId = 'loginForm';
  form: FormGroup;
  loginedsub: Subscription;
  birthDay: string;
  authSub: Subscription;
  private formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private commonService: CommonService,
    public asyncService: AsyncService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }

  onLogin(values: any) {
    const defaultObj = {
      isAuthenticated: true,
      userInformation: {
        fullName: 'Billal Hossain',
        cellNo: '01666666666',
        email: 'mozumder0204@gmail.com',
        category: 'superAdmin',
      },
    };
    if (this.form.valid) {
      this.asyncService.start();
      this.commonService.removeEmptyProperties(values);
      this.loginedsub = this.authService.authenticate(values).subscribe(
        (auth) => {
          this.asyncService.finish();
          // if (auth && auth.isAuthenticated) {
          this.store.dispatch(new Login(defaultObj));
          this.router.navigate(['/']);
          this.asyncService.finish();
          // }
          // else {
          //   this.commonService.showErrorMsg(
          //     'Invalid username or password. Try again!'
          //   );
          //   this.asyncService.finish();
          //   return;
          // }
        },
        (error) => {
          this.asyncService.finish();
          this.commonService.showErrorMsg('Error! Something went worng');
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.loginedsub) {
      this.loginedsub.unsubscribe();
    }
    this.asyncService.finish();
  }
}
