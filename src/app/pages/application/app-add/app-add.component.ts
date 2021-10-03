import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.scss'],
})
export class AppAddComponent implements OnInit {
  formId = 'robotAddForm';
  form: FormGroup;
  addAppSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private asyncService: AsyncService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.commonService.setUiInfo({
      formId: this.formId,
      goBackPath: '/application',
      title: 'Create Application',
    });
  }
  ngOnDestroy(): void {
    if (this.addAppSub) {
      this.addAppSub.unsubscribe();
    }
    this.asyncService.finish();
  }
}
