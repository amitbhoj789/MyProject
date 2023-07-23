import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigService} from "../../core/config.service";
import {AuthService} from "../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  forgotform!: FormGroup;
  isInvalid: boolean = false;
  isLoader: boolean = false;
  loginType: any;

  constructor(
      public config: ConfigService,
      private fb: FormBuilder,
      public auth: AuthService,
      private toast: ToastrService,
      private router: Router,
      private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('emailOtp');
    this.forgotform = this.fb.group({
      current_password: ['',],
      new_password: ['',],
      confirm_password: ['',],
    });
    const routeParams = this._activatedRoute.snapshot.paramMap;
    this.loginType = String(routeParams.get('loginType'));
  }

  submitForgot() {
    this.isInvalid = this.forgotform.invalid;
    this.isLoader = true;
    if (!this.isInvalid) {
      this.auth.forgotPassword(this.forgotform.value)
          .then((res: any) => {
            if (res && res.status) {
              this.toast.success(res.message)
              this.isLoader = false;
              localStorage.setItem('emailOtp', this.forgotform.value.email);
              this.router.navigate(['/otp/forgotPassword']);
            } else {
              this.toast.error(res.message);
              this.isLoader = false;
              this.router.navigate(['/otp/forgotPassword']);
            }
          })
    }
  }

}
